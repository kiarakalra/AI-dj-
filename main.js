song = "";

function preload() {
    song = loadSound("music.mp3");
}
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
leftWristX = 0;
rightWristY = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("posenet initializes");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist=" + scoreRightWrist + "scoreLeftWrist=" + scoreLeftWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("rightWristX=" + rightWristX + "rightWristY=" + rightWristY);
        console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY);
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill('black');
    stroke("bluevoilet");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20)

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "speed=0.5x";
            song.rate(0.5)
        }
        else if (rightWrisY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "speed=1x";
            song.rate(1)
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "speed=1.5x";
            song.rate(1.5);
        }
        else if (rightWrist > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "speed=2x";
            song.rate(2)
        }
        else if (rightWrist > 400) {
            document.getElementById("speed").innerHTML = "speed=2.5x";
            song.rate(3.5)
        }

    }
    if (scoreRightWrist > 0.2) {
        circle(leftWristX, leftWristY, 20)
        nNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500; 
        document.getElementById("volume").innerHTML = "Volume = " + volume;
         song.setVolume(volume);
    }
}