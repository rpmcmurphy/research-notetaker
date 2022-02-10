<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class DetailController extends Controller
{
    // create resourceful controller methods
    public function index()
    {
        // return all details
        $details = Detail::paginate(10);
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
        // Store a topic
        $this->validate($request, [
            'details_name' => 'required|min:3',
            'topic_id' => 'required',
            'details' => 'required|min:3'
        ]);

        $details = new Detail();

        $details->details_name = $request->details_name;
        $details->topic_id = $request->topic_id;
        $details->details = $request->details;

        $details->save();

        return Redirect::route('details.index')->with('message', 'Your details has been created.');
    }

    public function show($id)
    {
        // Show topic
        $topics = Topic::all();
        return view('details.show', ['details' => Detail::findOrFail($id), 'topics' => $topics]);
    }

    public function edit($id)
    {
        // 
    }

    public function update(Request $request)
    {

        // Update a topic
        $this->validate($request, [
            'details_name' => 'required|min:3',
            'topic_id' => 'required',
            'details' => 'required|min:3'
        ]);

        $details = Detail::where('id', $request->id)->firstOrFail();

        $details->details_name = $request->details_name;
        $details->topic_id = $request->topic_id;
        $details->details = $request->details;

        $details->save();


        return Redirect::route('details.index')->with('message', 'Your topic has been updated');
    }

    public function destroy($id)
    {

        // Delete topic
        $topic = Detail::find($id);
        $topic->delete();

        return Redirect::route('details.index')->with('message', $topic->name . ' has been created');
    }

    public function search_result(Request $request)
    {
        // Search for a topic
        $term = $request->term;
        $topic_id = $request->topic;

        $topics = Topic::all();

        $details = DB::table('details')
        ->when(isset($term), function ($query) use ($term) {
            $query->where('details_name', 'LIKE', '%' . $term . '%');
            $query->orWhere('details', 'LIKE', '%' . $term . '%');
        })
        ->when(isset($topic_id), function ($query) use ($topic_id) {
            $query->where('topic_id', $topic_id);
        })
        ->get();

        return view('details.result', ['details' => $details, 'topics' => $topics]);
    }
}
