<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;

class DownloadsController extends Controller
{
    public function download($file_path)
    {
        $file = public_path() . '/' . base64_decode($file_path);

        if (file_exists($file)) {
            $filename = pathinfo($file, PATHINFO_FILENAME);
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            $mimetype = mime_content_type($file);

            $headers = [
                'Content-Type' => $mimetype,
                'Content-Disposition' => 'attachment; filename="' . $filename . '.' . $extension . '"',
            ];

            return response()->download(base64_decode($file_path), 'filename.pdf', $headers);
        } else {
            return redirect()->back()->with('error', 'File not found.');
        }

    }
}
