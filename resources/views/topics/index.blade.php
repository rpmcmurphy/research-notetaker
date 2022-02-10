@extends('layouts.app')

@section('title', 'Topics')

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
        <ul class="list-group">
            @if(count($topics) > 0)
                @foreach($topics as $topic)
                    <li class="list-group-item">
                        <a href="{{ route('topics.show', $topic->id) }}" class="">{{ $topic->name }}</a>
                    </li>
                @endforeach
            @else
                <p>No topics yet</p>
            @endif
        </ul>
    </div>
    @if(count($topics) > 0)
    <div class="col-12 col-md-6 my-3 my-md-0">
        <div class="bg-primary py-3 px-3 text-white">
            Clcik to view or edit.
        </div>
    </div>
    @endif
</div>
@endsection