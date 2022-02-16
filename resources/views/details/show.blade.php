@extends('layouts.app')

@section('title', 'Details detail')

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
        <div class="col-12 col-md-8">
            <h5 class="d-flex align-items-center justify-content-between mb-3">
                <span>{{ $details->details_name }}</span>
                <a href="{{ route('details.index') }}" class="text-muted text-small d-block mx-2">Back to list</a>
            </h5>

            <form class="bg-white px-8 pt-6 pb-8 mb-4" method="POST" action="{{ route('details.update', $details->id) }}" enctype="multipart/form-data">
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
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="topic_ids">
                        Topic
                    </label>
                    <select class="form-control" name="topic_ids[]" id="topic_ids" multiple="">
                        <option value="">Select topic</option>
                        @foreach($topics as $topic)
                            <option value="{{ $topic->id }}" @if(in_array( $topic->id, $details->topics->pluck('id')->toArray())) selected="" @endif>{{ $topic->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="details-name">
                        Details
                    </label>
                    <textarea class="form-control" name="details" id="details" cols="30" rows="10" placeholder="Details name">{{ $details->details }}</textarea>
                </div>
                <div class="mb-4">
                    <div class="row">
                        @if($details->files_images)
                            @foreach(json_decode($details->files_images) as $file)
                                <div class="col-12 col-md-4 mb-4">
                                    <div class="image-card card mb-4">
                                        <div class="card-body d-flex align-items-center justify-content-center pb-0">
                                            @switch($type = pathinfo($file, PATHINFO_EXTENSION))
                                                @case('jpg')
                                                @case('jpeg')
                                                @case('png')
                                                @case('gif')
                                                @case('bmp')
                                                    <img class="detail-files" src="{{ asset('storage/' . $file) }}" alt="{{ $details->details_name }}" class="img-fluid">
                                                    @break
                                                @case('pdf')
                                                    <i class="far fa-file-pdf fa-5x text-danger"></i>
                                                    @break
                                                @case('doc')
                                                @case('docx')
                                                    <i class="far fa-file-word fa-5x text-primary"></i>
                                                    @break
                                                @default
                                                    <i class="far fa-file fa-5x text-info"></i>
                                            @endswitch
                                            <div class="d-flex flex-wrap justify-content-between w-100 mt-auto">
                                                <a class="btn btn-info btn-small mr-1 mb-3" href="{{ route('download', base64_encode('storage/' . $file)
                                                ) }}">Downlaod</a>
                                                <button class="btn btn-danger btn-small mb-3 delete-image" data-detail_id="{{ $details->id }}" data-file_link="{{ $file }}">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        @endif
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="flash-message mt-3"></div>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="details-name">
                        Images/Files
                    </label>
                    <input class="form-control" type="file" name="files_images[]" multiple>
                </div>
                <div class="flex items-center justify-between">
                    <input class="btn btn-info" type="submit" placeholder="Submit">
                </div>
            </form>

            <hr>

            <form class="text-right" role="form" method="POST"
                action="{{ route('details.destroy', $details->id) }}">
                @csrf

                <button type="submit" class="btn btn-danger">
                    Delete
                </button>
            </form>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            $("#topic_ids").select2({
                multiple: true,
                tags: true,
                placeholder: "Select topic",
            });

            $('.delete-image').click(function(e) {
                e.preventDefault();

                var detail_id = $(this).data('detail_id');
                var file_link = $(this).data('file_link');

                var that = $(this);

                $.ajax({
                    url: '{{ route('details.delete_file') }}',
                    type: 'POST',
                    data: {
                        detail_id: detail_id,
                        file_link: file_link,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function(data) {
                        if(data.error == false) {
                            that.closest('.col-md-4').remove();
                            $('.flash-message').html('<div class="alert alert-success">' + data.message + '</div>');
                            setTimeout(() => {
                                $('.flash-message').html('');
                            }, 2500);
                        }
                    }
                });
            });
        });
    </script>
@endsection
