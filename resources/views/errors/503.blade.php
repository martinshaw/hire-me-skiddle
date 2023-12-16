<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Hire Me (Martin Shaw) at Skiddle') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
    </head>
    <body class="font-sans antialiased w-screen h-screen flex flex-col justify-center items-center">
        <div class="select-none flex flex-col justify-center items-center gap-6">
            <div class="text-lg text-stone-400">Please wait a moment while I refresh the demonstration data...</div>
            <div class="text-lg text-stone-400">Refresh the page in a minute</div>
        </div>
    </body>
</html>
