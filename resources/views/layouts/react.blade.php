<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>

    <link rel="stylesheet" href="{{asset('css/app-react.css')}}">

</head>

<body>
    @yield('content')

    <script src="{{ asset('js/app-react.js') }}"></script>
</body>

</html>