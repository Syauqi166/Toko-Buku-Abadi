# Stage 1: Build Assets
FROM node:lts-alpine AS assets
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Application Runner
FROM dunglas/frankenphp:php8.3

ENV SERVER_NAME=:8000
WORKDIR /app

# Install system dependencies
RUN install-php-extensions \
  pcntl \
  pdo_mysql \
  bcmath \
  intl \
  zip \
  gd \
  opcache \
  redis

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

COPY . /app
COPY --from=assets /app/public/build ./public/build


RUN composer dump-autoload --optimize --no-dev \
  && php artisan octane:install --server=frankenphp --no-interaction \
  && php artisan storage:link \
  && chown -R www-data:www-data /app/storage /app/bootstrap/cache \
  && chmod -R ug+rwx /app/storage /app/bootstrap/cache

EXPOSE 8000

ENTRYPOINT ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=8000"]