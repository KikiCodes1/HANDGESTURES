
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img src="'+data_uri+'" id="result2"/>';
    });

}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/A9xHHhnhb/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("result2");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
} else{
    console.log(results);
    document.getElementById("gesture_name").innerHTML = results[0].label;
    prediction = results[0].label;
    speak();
    if(results[0].label == "Peace Sign"){
        document.getElementById("gesture_image").innerHTML = "&#9996;";
    }
    if(results[0].label == "Thumbs Up"){
        document.getElementById("gesture_image").innerHTML = "&#128077;";
    }
    if(results[0].label == "Thumbs Down"){
        document.getElementById("gesture_image").innerHTML = "&#128078;";
    }
    if(results[0].label == "Very Good Sign"){
        document.getElementById("gesture_image").innerHTML = "&#128076;";
    }
    if(results[0].label == "Stop Sign"){
        document.getElementById("gesture_image").innerHTML = "&#9995;";
    }
}
}