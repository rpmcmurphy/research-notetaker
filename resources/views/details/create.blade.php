@extends('layouts.app')

@section('title', 'Create details')

@section('content')
    <div class="row">
        <div class="col-12">
            @if ($message = Session::get('message'))
                <div class="alert alert-success alert-block">
                    {{ $message }}
                </div>
            @endif

            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6">
            <form class="bg-white px-8 pt-6 pb-8 mb-4" method="POST" action="{{ route('details.store') }}" enctype="multipart/form-data" >
                @csrf
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="details-name">
                        Details name
                    </label>
                    <input
                        class="form-control"
                        id="details-name" type="text" name="details_name" placeholder="Details name">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="topic_ids">
                        Topic
                    </label>
                    <select class="form-control" name="topic_ids[]" id="topic_ids" multiple="">
                        <option value="">Select topic</option>
                        @foreach($topics as $topic)
                            <option value="{{ $topic->id }}">{{ $topic->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="details">
                        Details
                    </label>
                    <textarea class="form-control" name="details" id="details" cols="30" rows="10" placeholder="Details name"></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="details-name">
                        Images/Files
                    </label>
                    <input class="form-control" type="file" name="files_images[]" multiple>
                </div>
                <div class="flex items-center justify-between">
                    <input
                        class="btn btn-primary" type="submit" placeholder="Submit">
                </div>
            </form>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function () {
            $("#topic_ids").select2({
                multiple: true,
                tags: true,
                placeholder: "Select topic",
            });
        });
    </script>
@endsection