// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const Horn = document.getElementById('horn-select');
  const imag = document.querySelector("[src='assets/images/no-image.png']");
  const audios = document.getElementsByClassName("hidden");
  const button = document.querySelector('button');
  const audio = audios[0];
  const slider  = document.getElementById("volume-controls");
  const icon = document.querySelector("[alt='Volume level 2']");
  const jsConfetti = new JSConfetti();
  var hornName;
  var changed = false;

  Horn.addEventListener('change', (event) => {
    changed = true;
     hornName = event.target.value;
    if (hornName === "air-horn") {
      imag.src = "assets/images/air-horn.svg";
      audio.src = "assets/audio/air-horn.mp3";
    }
    else if (hornName === "car-horn") {
      imag.src = "assets/images/car-horn.svg";
      audio.src = "assets/audio/car-horn.mp3";
    }
    else if (hornName === "party-horn") {
      imag.src = "assets/images/party-horn.svg";
      audio.src = "assets/audio/party-horn.mp3";
    }
    
  })
  button.addEventListener('click', (event) => {
    if(hornName === "party-horn") {
      jsConfetti.addConfetti();
    }
    if(changed === true) {
      audio.play();
    }
  })
  slider.addEventListener('change', (event) => {
    var volumeNum = event.target.value;
    audio.volume = event.target.value/100;
    if (volumeNum == 0) {
      icon.src = "assets/icons/volume-level-0.svg";
    }
    else if (volumeNum < 33) {
      icon.src = "assets/icons/volume-level-1.svg";
    }
    else if (volumeNum < 67) {
      icon.src = "assets/icons/volume-level-2.svg";
    }
    else {icon.src = "assets/icons/volume-level-3.svg";}
  })

}