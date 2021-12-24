prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "jpeg",
    jpeg_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function takesnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='capture_image'src='" + data_uri + "' >";
    });

}
console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/zUxBZFRa1/model.json", modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");

}

function speak() {

    synth = window.speechSynthesis;
    speak_data1 = "the first prediction is" + prediction_1;
    speak_data2 = "the second prediction is" + prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);

}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "LIKE") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (results[0].label == "DISLIKE") {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if (results[0].label == "SWAG") {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if (results[0].label == "NICE") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }

        if (results[1].label == "LIKE") {
            document.getElementById("update_emoji_2").innerHTML = "&#128077;";
        }
        if (results[1].label == "DISLIKE") {
            document.getElementById("update_emoji_2").innerHTML = "&#128078;";
        }
        if (results[1].label == "SWAG") {
            document.getElementById("update_emoji_2").innerHTML = "&#129304;";
        }
        if (results[1].label == "NICE") {
            document.getElementById("update_emoji_2").innerHTML = "&#128076;";
        }


    }




}