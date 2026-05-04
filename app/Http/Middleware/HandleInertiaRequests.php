<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id_pengguna' => $request->user()->id_pengguna,
                    'username'    => $request->user()->username,
                    'nama'        => $request->user()->nama,
                    'email'       => $request->user()->email,
                ] : null,
            ],
        ];
    }
}
