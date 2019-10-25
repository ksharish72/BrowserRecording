var recordingBtn = document.getElementsByClassName("recordingBtn")[0];
var container = document.getElementsByClassName("container")[0];

let mic, recorder, soundFile;
recordingBtn.addEventListener("click", function() {
  if (recordingBtn.innerHTML == "Start Recording") {
    removePlayAndSaveBtnELements();
    getAudioContext().resume();
    mic = new p5.AudioIn();
    mic.start();
    // create a sound recorder
    recorder = new p5.SoundRecorder();

    // connect the mic to the recorder
    recorder.setInput(mic);

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();
    recorder.record(soundFile);
    recordingBtn.innerHTML = "Stop Recording";
  } else if (recordingBtn.innerHTML == "Stop Recording") {
    mic.stop();
    recorder.stop();
    recordingBtn.innerHTML = "Start Recording";
    appendPlayAndSaveBtnElements();
  }
});

function removePlayAndSaveBtnELements() {
  var playBtnElement = document.getElementsByClassName("playBtn")[0];
  var saveBtnElement = document.getElementsByClassName("saveBtn")[0];
  if (
    typeof playBtnElement != "undefined" &&
    typeof saveBtnElement != "undefined"
  ) {
    container.removeChild(playBtnElement);
    container.removeChild(saveBtnElement);
  }
}

document.addEventListener("click", function(e) {
  if (e.target && e.target.className == "playBtn") {
    soundFile.play(); // play the result!
  }
});
function draw() {
  if (typeof mic != "undefined") {
    background(0);
    micLevel = mic.getLevel();
    console.log(micLevel);
    ellipse(
      width / 2,
      constrain(height - micLevel * height * 5, 0, height),
      10,
      10
    );
  }
}

function appendPlayAndSaveBtnElements() {
  var playButton = document.createElement("button");
  playButton.innerHTML = "Play Button";
  playButton.className = "playBtn";
  container.appendChild(playButton);
  var saveButton = document.createElement("button");
  saveButton.innerHTML = "Save Button";
  saveButton.className = "saveBtn";
  container.appendChild(saveButton);
}
