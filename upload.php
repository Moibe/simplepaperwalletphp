<?php 
if (isset($_POST['submit'])) {
    $file = $_FILES['file']; 
   
    $fileName = $_FILES['file']['name'];
    $fileTmpName = $_FILES['file']['tmp_name'];
    $fileSize = $_FILES['file']['size'];
    $fileError = $_FILES['file']['error'];
    $fileTypw = $_FILES['file']['type'];

    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));
    
    $allowed = array('txt'); 

    if (in_array($fileActualExt, $allowed)) {
        if ($fileError === 0){
            if ($fileSize < 1000000) {
                $fileNameNew = uniqid('', true).".".$fileActualExt;
                $fileDestination ='uploads/'.$fileNameNew;
                header("Location: next.php?uploadsuccess");
                move_uploaded_file($fileTmpName, $fileDestination);
                $data = file_get_contents($fileTmpName); 
                $data = json_decode($data, true);
                foreach($data as $row)
                {
                    $inicio = $row["inicio"];
                }

               
                
                /* if($inicio === 6310370){
                    header("Location: next.php?uploadsuccess");
                }
                else{
                    echo "No autorizado.";
                } */

                
            } else {
                echo "Your file is too big!"; 

            }

        } else {
            echo "There was an error uploading your file!";
        }

    } else {
        echo "You cannot upload files of this type!";
    }

}