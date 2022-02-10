<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TopicController extends Controller
{
    // create resourceful controller methods
    public function index()
    {
        // return all topics
        $topics = Topic::all();
        return view('topics.index', ['topics' => $topics]);
    }

    public function create()
    {
        // topic create form 
        return view('topics.create');
    }

    public function store(Request $request)
    {
        // Store a topic
        $this->validate($request, [
            'topic_name' => 'required|min:3'
        ]);
        
        $topic = new Topic();

        $topic->name = $request->topic_name;

        $topic->save();

        return Redirect::route('topics.index')->with('message', 'Your topic has been created');
    }

    public function show($id)
    {
        // Show topic
        return view('topics.show', ['topic' => Topic::findOrFail($id)]);
    }

    public function edit($id)
    {
        // 
    }

    public function update(Request $request) {

        // Update a topic
        $this->validate($request, [
            'topic_name' => 'required|max:255'
        ]);

        $topic = Topic::where('id', $request->id)->firstOrFail();
        $topic->name = $request->input('topic_name');
        $topic->save();


        return Redirect::route('topics.index')->with('message', 'Your topic has been updated');
    }

    public function destroy($id) {

        // Delete topic
        $topic = Topic::find($id);
        $topic->delete();

        return Redirect::route('topics.index')->with('message', $topic->name . ' has been created');
    }
}
