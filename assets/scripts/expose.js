// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // DONE
  const hornType = document.getElementById("horn-select");
  const hornImgType = document.querySelector("[alt='No image selected']");
  const currentVolume = document.getElementById("volume");
  const currentVolumeImg = document.querySelector("[alt='Volume level 2']");

  const currentAudio = document.getElementsByClassName("hidden");
  const playCurrentAudio = document.querySelector("button");

  const audioFile = currentAudio[0];

  const jsConfetti = new JSConfetti();

  let audioPlayCanBeDone = false;

  hornType.addEventListener("change", changeHornContent); // horn type
  currentVolume.addEventListener("input", changeVolumContent); // volume
  playCurrentAudio.addEventListener("click", playSound); // button

  function changeHornContent() {
    audioPlayCanBeDone = true;
    switch (hornType.value) {
      case "air-horn":
        hornType.value = "air-horn";
        hornImgType.src = "assets/images/air-horn.svg"
        audioFile.src = "assets/audio/air-horn.mp3";
        break;
      case "car-horn":
        hornType.value = "car-horn";
        hornImgType.src = "assets/images/car-horn.svg"
        audioFile.src = "assets/audio/car-horn.mp3";
        break;
      case "party-horn":
        hornType.value = "party-horn";
        hornImgType.src = "assets/images/party-horn.svg"
        audioFile.src = "assets/audio/party-horn.mp3";
        break;
    }
  }

  function changeVolumContent() {
    if (currentVolume.value == 0) {
      currentVolumeImg.src = "assets/icons/volume-level-0.svg";
    } else if (currentVolume.value >= 1 && currentVolume.value < 33) {
      currentVolumeImg.src = "assets/icons/volume-level-1.svg";
    } else if (currentVolume.value >= 33 && currentVolume.value < 67) {
      currentVolumeImg.src = "assets/icons/volume-level-2.svg";
    } else if (currentVolume.value >= 67) {
      currentVolumeImg.src = "assets/icons/volume-level-3.svg";
    }
    audioFile.volume = currentVolume.value / 100.00
  }

  function playSound() {
    if (hornType.value == "party-horn") {
      jsConfetti.addConfetti();
    }
    if (audioPlayCanBeDone) {
      audioFile.play();
    }
  }
}