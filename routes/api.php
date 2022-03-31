<?php

use App\Models\Topic;
use App\Models\Detail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/topic-list', function () {

    // get all topic ID and name, and sort by name
    $topic_list = Topic::select('id', 'name')->orderBy('name')->get();

    return response()->json([
        'data' => $topic_list,
        'status' => 'success',
    ], 200);
});

Route::get('/topic-list-react-select', function () {

    // get all topic ID and name, and sort by name
    $topic_list = Topic::select(['id AS value', 'name AS label'])->orderBy('name')->get();

    return response()->json([
        'data' => $topic_list,
        'status' => 'success',
    ], 200);
});

Route::get('/topic-list/{page_num?}', function ($page_num = 1) {

    $topic_list = Topic::orderBy('name', 'asc')->paginate(10, ['id', 'name'], 'page', $page_num);

    return response()->json([
        'data' => $topic_list,
        'status' => 'success',
    ], 200);
});

Route::get('/topic/{id}', function ($id) {
    $topic = Topic::where('id', $id)
        ->first();

    return response()->json([
        'data' => $topic,
        'status' => 'success',
    ], 200);
});

Route::post('/topic-add', function (Request $request) {

    $validator = Validator::make($request->all(), [
        'topic_name' => 'required|min:2',
    ]);

    if ($validator->fails()) {

        $message = $validator->errors();

        return response()->json([
            'status' => 'error',
            'message' => Arr::flatten($message->all())
        ], 200);
    }

    // Find if topic name already exists
    $topic_name = $request->input('topic_name');
    $topic_exists = Topic::where('name', $topic_name)->first();

    if ($topic_exists) {
        return response()->json([
            'status' => 'error',
            'message' => 'Topic name already exists!'
        ], 200);
    }

    $topic = new Topic();
    $topic->name = $request->topic_name;
    $topic->save();

    if ($topic) {
        return response()->json([
            'data' => $topic,
            'status' => 'success',
            'message' => 'Topic successfully created.',
        ], 200);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Something went wrong. Please try again.',
        ], 200);
    }
});

Route::post('/topic-update', function (Request $request) {

    $validator = Validator::make($request->all(), [
        'id' => 'required',
        'topic_name' => 'required|min:3',
    ]);

    if ($validator->fails()) {

        $message = $validator->errors();

        return response()->json([
            'status' => 'error',
            'message' => $message
        ], 200);
    }

    // Find if topic name already exists
    $topic_name = $request->topic_name;
    $topic_exists = Topic::where('name', $topic_name)->first();

    if ($topic_exists) {
        return response()->json([
            'status' => 'error',
            'message' => 'Topic name already exists!'
        ], 200);
    }

    $topic = Topic::where('id', $request->id)->firstOrFail();
    $topic->name = $request->topic_name;
    $topic->save();

    if ($topic) {
        return response()->json([
            'data' => $topic,
            'status' => 'success',
            'message' => 'Topic successfully updated.',
        ], 200);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Something went wrong. Please try again.',
        ], 200);
    }
});

Route::get('/topic-delete/{id}', function ($id) {

    $topic = Topic::where('id', $id)->firstOrFail();

    $topic->delete();

    if ($topic) {
        return response()->json([
            'status' => 'success',
            'message' => 'Topic has been deleted.',
        ], 200);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Something went wrong. Please try again.',
        ], 200);
    }
});

Route::get('/detail-list/{page_num?}', function ($page_num = 1) {

    $details_list = Detail::query()
        ->with(['topics' => function ($query) {
            $query->select('id', 'name');
        }])
        ->orderBy('created_at', 'desc')
        ->paginate(10, ['id', 'details_name', 'details', 'files_images'], 'page', $page_num);

    return response()->json([
        'data' => $details_list,
        'status' => 'success',
    ], 200);
});

Route::get('/detail/{id}', function($id) {
    $detail = Detail::query()
        ->with(['topics' => function ($query) {
            $query->select('id');
        }])
        ->where('id', $id)
        ->first();

    return response()->json([
        'data' => $detail,
        'status' => 'success',
    ], 200);
});

Route::patch('/detail-add', function(Request $request) {

    $validator = Validator::make($request->all(), [
        'details_name' => 'required|min:3',
        'details' => 'required|min:3'
    ]);

    if ($validator->fails()) {

        $message = $validator->errors();

        return response()->json([
            'status' => 'error',
            'type' => 'validation',
            'message' => Arr::flatten($message->all())
        ], 200);
    }

    // Find if details name already exists
    $details_name = $request->details_name;
    $details_exists = Detail::where('details_name', $details_name)->first();

    if ($details_exists) {
        return response()->json([
            'status' => 'error',
            'message' => 'Details name already exists!'
        ], 200);
    }

    $details = new Detail();

    $details->details_name = $request->details_name;
    $details->details = $request->details;

    if ($request->hasFile('files_images')) {

        $allowedfileExtension = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'docx', 'txt', 'zip', 'mp4', 'mp3', 'flv', 'mkv'];
        $files = $request->file('files_images');

        foreach ($files as $file) {
            $filename = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $check = in_array($extension, $allowedfileExtension);
            $filename_without_ext = pathinfo($filename, PATHINFO_FILENAME);

            if ($check) {
                $filename = $file->storeAs('files_images', $filename_without_ext . '_' . Str::random(5) . '.' .  $extension, 'public');
                if ($filename) {
                    $stored_filenames[] = $filename;
                }
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'File extension not allowed.',
                ], 200);
            }
        }

        $details->files_images = json_encode($stored_filenames);
    }

    $details->save();

    if ($request->topic_ids != null && $request->topic_ids != '') {
        $details->topics()->attach(explode(',', $request->topic_ids));
    }

    if($details) {
        return response()->json([
            'data' => $details,
            'message' => 'Detail created successfully!',
            'status' => 'success',
        ], 200);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Something went wrong. Please try again.',
        ], 200);
    }
});

Route::patch('/detail-update', function (Request $request) {

    $validator = Validator::make($request->all(), [
        'details_name' => 'required|min:3',
        'details' => 'required|min:3'
    ]);

    if ($validator->fails()) {

        $message = $validator->errors();

        return response()->json([
            'status' => 'error',
            'message' => $message
        ], 200);
    }

    // Find if details name already exists
    $details_name = $request->details_name;
    $details_exists = Detail::where('details_name', $details_name)->where('id', '!=', $request->id)->first();

    if ($details_exists) {
        return response()->json([
            'status' => 'error',
            'message' => 'Details name already exists!'
        ], 200);
    }

    $details = Detail::where('id', $request->id)->firstOrFail();

    $details->details_name = $request->details_name;
    $details->details = $request->details;

    if ($request->hasFile('files_images')) {

        $allowedfileExtension = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'docx', 'txt','zip', 'mp4', 'mp3', 'flv', 'mkv'];
        $files = $request->file('files_images');

        foreach ($files as $file) {
            $filename = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $check = in_array($extension, $allowedfileExtension);
            $filename_without_ext = pathinfo($filename, PATHINFO_FILENAME);

            if ($check) {
                $filename = $file->storeAs('files_images', $filename_without_ext . '_' . Str::random(5) . '.' .  $extension, 'public');
                if ($filename) {
                    $stored_filenames[] = $filename;
                }
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'File extension not allowed.',
                ], 200);
            }
        }

        $details->files_images = $details->files_images ? json_encode(array_merge(json_decode($details->files_images), $stored_filenames)) : json_encode($stored_filenames);
    }

    $details->save();

    if($request->topic_ids != null && $request->topic_ids != '') {
        $details->topics()->sync(explode(',', $request->topic_ids));
    }

    if ($details) {
        return response()->json([
            'data' => $details,
            'message' => 'Successfully edited.',
            'status' => 'success',
        ], 200);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Something went wrong. Please try again.',
        ], 200);
    }
});

Route::post('/delete-file', function(Request $request) {

    $detail_id = $request->detail_id;
    $file_link = $request->file_link;

    $details = Detail::where('id', $detail_id)->firstOrFail();
    $files_images = json_decode($details->files_images);

    $key = array_search($file_link, $files_images);

    if ($key !== false) {
        unset($files_images[$key]);
    }

    foreach ($files_images as $file) {
        $updated_file_paths[] = $file;
    }

    $details->files_images = (isset($updated_file_paths) && !empty($updated_file_paths)) ? json_encode($updated_file_paths) : null;
    $details->save();

    if ($details) {

        $full_image_path = public_path('storage/' . $file_link);

        if (File::exists($full_image_path)) {
            File::delete($full_image_path);

            return response()->json([
                'status' => 'success',
                'message'  => 'Your file has been deleted.',
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message'  => 'Your file has not been deleted.',
            ], 200);
        }
    } else {

        return response()->json([
            'status' => 'error',
            'message'  => 'Your file has not been deleted.',
        ], 200);
    }
});

Route::get('/detail-delete/{id}', function($id) {

    $details = Detail::where('id', $id)->firstOrFail();

    $details->delete();

    if ($details) {
        return response()->json([
            'status' => 'success',
            'message' => 'Detail has been deleted.',
        ], 200);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Something went wrong. Please try again.',
        ], 200);
    }
});

Route::post('/search-result', function(Request $request) {

    $term = $request->searchTerm;
    $topic_id = $request->topicId;

    $topics = Topic::all();
    $details = Detail::with(['topics'])->newQuery();

    if ($request->has('searchTerm') && $term != '' && $term != null) {
        $details->where(function ($query) use ($term) {
            $query->where('details_name', 'LIKE', '%' . $term . '%')
                ->orWhere('details', 'LIKE', '%' . $term . '%');
        });
    }

    if ($request->has('topicId') && $topic_id != '' && $topic_id != null) {
        $details->whereHas(
            'topics',
            function ($query) use ($topic_id) {
                $query->where('topics.id', $topic_id);
            }
        );
    }

    $details = $details->get();

    if ($details) {
        return response()->json([
            'details' => $details,
            'topics' => $topics,
            'status' => 'success',
        ], 200);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Something went wrong. Please try again.',
        ], 200);
    }
});

// Routes for testing purpose only
Route::post('/test-file-upload', function (Request $request) {

    if ($request->hasFile('files_images')) {

        $allowedfileExtension = ['pdf', 'jpg', 'png', 'gif', 'bmp', 'docx', 'txt', 'zip'];
        $files = $request->file('files_images');

        foreach ($files as $file) {
            $filename = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $check = in_array($extension, $allowedfileExtension);
            $filename_without_ext = pathinfo($filename, PATHINFO_FILENAME);

            // return $filename;

            if ($check) {
                $filename = $file->storeAs('files_images', $filename_without_ext . '_' . Str::random(5) . '.' .  $extension, 'public');
                if ($filename) {
                    $stored_filenames[] = $filename;
                }
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'File extension not allowed.',
                ], 200);
            }
        }

        return response()->json([
            'status' => 'success ends.',
        ], 200);
    }

    return response()->json([
        'status' => 'ZXZX',
    ], 200);
});