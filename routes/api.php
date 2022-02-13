<?php

use App\Models\Topic;
use App\Models\Detail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
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

Route::get('/topic-list/{page_num?}', function ($page_num = 1) {

    $topic_list = Topic::paginate(10, ['id', 'name'], 'page', $page_num);

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
        'topic_name' => 'required|min:3',
    ]);

    if ($validator->fails()) {

        $message = $validator->errors();

        return response()->json([
            'status' => 'error',
            'message' => $message
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

Route::post('/topic-update/{id}', function (Request $request, $id) {

    $validator = Validator::make($request->all(), [
        'topic_name' => 'required|min:3',
    ]);

    if ($validator->fails()) {

        $message = $validator->errors();

        return response()->json([
            'status' => 'error',
            'message' => $message
        ], 200);
    }

    $topic = Topic::where('id', $id)->firstOrFail();
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

Route::post('/topic-delete/{id}', function ($id) {

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
        ->paginate(10, ['id', 'details_name', 'details', 'files_images'], 'page', $page_num);

    return response()->json([
        'data' => $details_list,
        'status' => 'success',
    ], 200);
});

Route::get('/detail/{id}', function($id) {
    $detail = Detail::query()
        ->with(['topics' => function ($query) {
            $query->select('id', 'name');
        }])
        ->where('id', $id)
        ->first();

    return response()->json([
        'data' => $detail,
        'status' => 'success',
    ], 200);
});

Route::post('/detail-add', function(Request $request) {

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

    $details = new Detail();

    $details->details_name = $request->details_name;
    $details->details = $request->details;

    if ($request->hasFile('files_images')) {

        $allowedfileExtension = ['pdf', 'jpg', 'png', 'gif', 'bmp', 'docx'];
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

    $created_detail = Detail::find($details->id);
    $created_detail->topics()->attach($request->topic_ids);

    if($details) {
        return response()->json([
            'data' => $details,
            'status' => 'success',
        ], 200);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Something went wrong. Please try again.',
        ], 200);
    }
});

Route::post('/detail-update/{id}', function (Request $request, $id) {

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

    $details = Detail::where('id', $id)->firstOrFail();

    $details->details_name = $request->details_name;
    $details->details = $request->details;

    if ($request->hasFile('files_images')) {

        $allowedfileExtension = ['pdf', 'jpg', 'png', 'gif', 'bmp', 'docx'];
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

    $created_detail = Detail::find($details->id);
    $created_detail->topics()->attach($request->topic_ids);

    if ($details) {
        return response()->json([
            'data' => $details,
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
                'error' => false,
                'message'  => 'Your file has been deleted.',
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message'  => 'Your file has not been deleted.',
            ], 200);
        }
    } else {

        return response()->json([
            'error' => true,
            'message'  => 'Your file has not been deleted.',
        ], 200);
    }
});

Route::post('/detail-delete/{id}', function($id) {
    
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