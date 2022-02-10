@extends('layouts.app')

@section('title', 'Result')

@section('content')
<div class="row">
    <div class="col-12">
        @if ($message = Session::get('message'))
            <div class="alert alert-success alert-block">
                {{ $message }}
            </div>
        @endif
    </div>
</div>

<div class="row">
    <div class="col-12 col-md-6">
        {{-- search details by text, title or id --}}
        <form action="{{ route('search') }}" method="post">
            @csrf
            <div class="form-group mb-3">
                <label for="search">Topic</label>
                <select name="topic" id="topic" class="form-control">
                    {{-- <option value="">Select Topic</option> --}}
                    @foreach ($topics as $topic)
                        <option value="{{ $topic->id }}">{{ $topic->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group mb-3">
                <input type="text" class="form-control" name="term" id="term" placeholder="Search by text, topic">
            </div>
            <button type="submit" class="btn btn-primary">Search</button>
    </div>
</div>

<div class="row mt-3">
    <div class="col-12 col-md-6">
        <ul class="list-group">
            @if(count($details) > 0)
                @foreach($details as $detail)
                    <li class="list-group-item">
                        <a href="{{ route('details.show', $detail->id) }}" class="">{{ $detail->details_name }}</a>
                    </li>
                @endforeach
            @else
                <p>No details yet</p>
            @endif
        </ul>
    </div>
</div>

@endsection