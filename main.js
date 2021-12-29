
// get submit button
var submit = document.getElementById("submitButton");

// attach onclick event to submit button
submit.onclick = function () {
    // check if fields 1 to 12 are filled by input type text and if they are not empty save their values to a text file
    if (checkFields()) {
        // alert("Thanks for submitting your information!");

        // save to text file
        // saveToTextFile();

        // submit all fields through http to php backend
        submitAllFields();
    }
    else {
        alert("Please fill in all fields!");
    }
}

// submit all fields through ajax to php backend
function submitAllFields() {
    // get all fields
    var fields = document.getElementsByTagName("input");
    var text = "";
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].type == "text") {
            if (fields[i].value != "") {
                var fieldNumber = i + 1;
                text += "Field " + fieldNumber + ": " + fields[i].value + "\n";
            }
        }
    }

    console.log(text);

    // send all field values through http to php backend
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "submit.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("fields=" + text);

    // get response from php backend
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    }

    // clear all fields
    // for (var i = 0; i < fields.length; i++) {
    //     fields[i].value = "";
    // }
}

function saveToTextFile() {
    var fields = document.getElementsByTagName("input");
    var text = "";
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].type == "text") {
            if (fields[i].value != "") {
                var fieldNumber = i + 1;
                text += "Field " + fieldNumber + ": " + fields[i].value + "\n";
            }
        }
    }
    if (text != "") {
        var textFile = null,
            makeTextFile = function (text) {
                var data = new Blob([text], {
                    type: 'text/plain'
                });

                // If we are replacing a previously generated file we need to
                // manually revoke the object URL to avoid memory leaks.
                if (textFile !== null) {
                    window.URL.revokeObjectURL(textFile);
                }

                textFile = window.URL.createObjectURL(data);

                return textFile;
            };

        // maketextfile and download it as a text file
        var link = document.createElement('a');
        link.download = "fields-data.txt";
        link.href = makeTextFile(text);
        link.click();

    }
}

function checkFields() {
    var fields = document.getElementsByTagName("input");
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].type == "text") {
            if (fields[i].value == "") {
                return false;
            }
        }
    }
    return true;
}