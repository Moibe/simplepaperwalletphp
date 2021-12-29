<?php

// get fields from post
$fields = $_POST['fields'];

// print_r($fields);

// create data directory if it doesn't exist yet (for storing files) 
if (!file_exists('data')) {
    mkdir('data');
}

// file name is the current date plus time in epoch format
$filename = date('Y-m-d_His') . '.txt';
$filepath = 'data/' . $filename;

// save fields to text file in data folder 
file_put_contents($filepath, $fields);
header("Location: next.php?uploadsuccess");

// check if file saved
if (file_exists($filepath)) {
    echo 'File saved';
    
} else {
    echo 'File not saved';
}

?>