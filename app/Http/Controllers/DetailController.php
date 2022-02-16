<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Detail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;

class DetailController extends Controller
{
    // create resourceful controller methods
    public function index()
    {
        // return all details
        $details = Detail::orderBy('created_at', 'DESC')->paginate(10);
        $topics = Topic::all();

        return view('details.index', ['details' => $details, 'topics' => $topics]);
    }

    public function create()
    {
        // topic create form 

        $topics = Topic::all();
        return view('details.create', ['topics' => $topics]);
    }

    public function store(Request $request)
    {
        // Store a detail
        $this->validate($request, [
            'details_name' => 'required|min:3',
            'details' => 'required|min:3'
        ]);

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

                if($check) {
                    $filename = $file->storeAs('files_images', $filename_without_ext . '_' . Str::random(5) . '.' .  $extension, 'public');
                    if ($filename) {
                        $stored_filenames[] = $filename;
                    }
                } else {
                    return Redirect::route('details.create')->with('message', 'Your file extension is not allowed.');
                }
            }

            $details->files_images = json_encode($stored_filenames);
        }

        $details->save();

        $created_detail = Detail::find($details->id);
        $created_detail->topics()->attach($request->topic_ids);

        return Redirect::route('details.index')->with('message', 'Your details has been created.');
    }

    public function show($id)
    {
        // Show topic
        $topics = Topic::all();
        $details = Detail::with('topics')->findOrFail($id);

        return view('details.show', ['details' => $details, 'topics' => $topics]);
    }

    public function edit($id)
    {
        // 
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'details_name' => 'required|min:3',
            'details' => 'required|min:3'
        ]);

        $details = Detail::where('id', $request->id)->firstOrFail();

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
                    return Redirect::route('details.create')->with('message', 'Your file extension is not allowed.');
                }
            }

            $details->files_images = $details->files_images ? json_encode(array_merge(json_decode($details->files_images), $stored_filenames)) : json_encode($stored_filenames);
        }

        $details->save();

        $created_detail = Detail::find($details->id);
        $created_detail->topics()->sync($request->topic_ids);

        return Redirect::route('details.show', $details->id)->with('message', 'Your details has been updated');
    }

    public function delete_file(Request $request)
    {
        $detail_id = $request->detail_id;
        $file_link = $request->file_link;

        $details = Detail::where('id', $detail_id)->firstOrFail();

        $files_images = json_decode($details->files_images);

        $key = array_search($file_link, $files_images);

        if ($key !== false) {
            unset($files_images[$key]);
        }

        foreach($files_images as $file) {
            $updated_file_paths[] = $file;
        }

        $details->files_images = (isset($updated_file_paths) && ! empty($updated_file_paths)) ? json_encode($updated_file_paths) : null;
        $details->save();   

        if($details) {

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
    }

    public function destroy($id)
    {
        // Delete topic
        $detail = Detail::find($id);
        $detail->delete();

        return Redirect::route('details.index')->with('message', $detail->details_name . ' has been deleted.');
    }

    public function search_result(Request $request)
    {
        $term = $request->term;
        $topic_id = $request->topic;

        $topics = Topic::all();
        $details = Detail::with(['topics'])->newQuery();

        if ($request->has('term') && $request->term != '' && $request->term != null) {
            $details->where(function($query) {
                $query->where('details_name', 'LIKE', '%' . request()->term . '%')
                    ->orWhere('details', 'LIKE', '%' . request()->term . '%');
            });
        }

        if ($request->has('topic')) {
            $details->whereHas(
                'topics',
                function ($query) use ($topic_id) {
                    $query->where('topics.id', $topic_id);
                }
            );
        }

        $result = $details->get();

        return view('details.result', ['details' => $result, 'topics' => $topics]);
    }
}
