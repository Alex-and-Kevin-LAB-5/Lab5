// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // DONE
  const synth = window.speechSynthesis;
  const voiceSelectList = document.getElementById("voice-select");
  const talkButton = document.querySelector("button");
  const textToSpeak = document.getElementById("text-to-speak");
  const selectedVoice = document.querySelector("select");
  const currentImage = document.querySelector("[alt='Smiling face']");

  var voices = [];

  let canSpeak = false;

  let utterThis = new SpeechSynthesisUtterance(textToSpeak.placeholder);

  selectedVoice.addEventListener("change", updateVoice);
  textToSpeak.addEventListener("input", updateText);
  talkButton.addEventListener("click", talkToWorld);



  function populateVoiceList() {
    if (typeof speechSynthesis === 'undefined') {
      return;
    }

    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.value = i;

      if (voices[i].default) {
        option.textContent += ' — DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelectList.appendChild(option);
    }
  }

  populateVoiceList();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function updateVoice() {
    utterThis.voice = voices[selectedVoice.value];
    utterThis.lang = voices[selectedVoice.value].lang;
  }

  function talkToWorld() {
    if (textToSpeak.placeholder == "") {
      return;
    }
    if (canSpeak) {
      currentImage.src = "assets/images/smiling-open.png";
      synth.speak(utterThis);
    }
    setInterval(stoppedSpeaking, 500);
  }

  function updateText() {
    canSpeak = true;
    textToSpeak.placeholder = textToSpeak.value;
    utterThis.text = textToSpeak.placeholder;
  }

  function stoppedSpeaking() {
    if (textToSpeak.placeholder == "") {
      return;
    }
    if (synth.speaking == false) {
      currentImage.src = "assets/images/smiling.png";
    }
  }
}