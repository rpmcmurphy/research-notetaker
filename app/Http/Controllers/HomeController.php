<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Detail;

class HomeController extends Controller
{
    public function index()
    {
        // return all details
        $topics = Topic::all();
        $details = Detail::orderBy('created_at', 'DESC')->paginate(10);

        return view('home.index', ['details' => $details, 'topics' => $topics]);
    }
}
