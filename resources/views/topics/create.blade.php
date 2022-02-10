@extends('layouts.app')

@section('title', 'Create topic')

@section('content')
    <div class="row">
        <div class="col-12 col-md-6">
            {{-- create topic --}}
            <form class="" method="POST" action="{{ route('topics.store') }}">
                @csrf
                <div class="form-group mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="topic-name">
                        Topic name
                    </label>
                    <input
                        class="form-control"
                        id="topic-name" type="text" name="topic_name" placeholder="Topic name">
                </div>
                <div class="flex items-center justify-between">
                    <input class="btn btn-primary" type="submit" placeholder="Submit">
                </div>
            </form>
        </div>
    </div>
@endsection
