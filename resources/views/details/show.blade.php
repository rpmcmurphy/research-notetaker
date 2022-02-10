@extends('layouts.app')

@section('title', 'Details detail')

@section('content')
    <div class="row">
        <div class="col-12 col-md-8">
            <h5 class="d-flex align-items-center justify-content-between mb-3">
                <span>{{ $details->details_name }}</span>
                <a href="{{ route('topics.index') }}" class="text-muted text-small d-block mx-2">Back to list</a>
            </h5>
            
            <form class="bg-white px-8 pt-6 pb-8 mb-4" method="POST" action="{{ route('details.update', $details->id) }}">
                @csrf
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="details-name">
                        Details name
                    </label>
                    <input class="form-control" id="details-name" type="hidden" name="id" value="{{ $details->id }}">
                    <input class="form-control" id="details-name" type="text" name="details_name" value="{{ $details->details_name }}" 
                        placeholder="{{ $details->details_name }}">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="details-name">
                        Topic
                    </label>
                    <select class="form-control" name="topic_id" id="topic_id">
                        <option value="">Select topic</option>
                        @foreach($topics as $topic)
                            <option value="{{ $topic->id }}" @if($topic->id == $details->topic_id) selected @endif>{{ $topic->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="details-name">
                        Details
                    </label>
                    <textarea class="form-control" name="details" id="details" cols="30" rows="10" placeholder="Details name">{{ $details->details }}</textarea>
                </div>
                <div class="flex items-center justify-between">
                    <input class="btn btn-primary" type="submit" placeholder="Submit">
                </div>
            </form>

            <form class="text-right" role="form" method="POST"
                action="{{ route('topics.destroy', $details->id) }}">
                @csrf

                <button type="submit" class="btn btn-primary">
                    Delete
                </button>
            </form>
        </div>
    </div>
@endsection
