// explore.js

window.addEventListener('DOMContentLoaded', init);


function init() {
  // TODO
  const synth = window.speechSynthesis;
  const voiceSelect = document.getElementById("voice-select");
  const button = document.querySelector('button');
  const textInput = document.getElementById('text-to-speak');
  const imag = document.querySelector('[alt="Smiling face"]');
  let voices = [];
  var text;
  var voiceValue;

  function populateVoiceList() {
    voices = synth.getVoices();
  
    for (let i = 0; i < voices.length ; i++) {
      
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.value = i;
      if (voices[i].default) {
        option.textContent += ' — DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  var utterThis;
  textInput.addEventListener('input', (event) => {
    text = event.target.value;
  })

  
  voiceSelect.addEventListener('change', (event) => {
    voiceValue = event.target.value;
  })
    
  button.addEventListener('click', () => {
    utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voices[voiceValue];
    utterThis.volume = 1.0;
    synth.speak(utterThis);
  })
  setInterval(()=>{
    if(synth.speaking == true) {
      imag.src = "assets/images/smiling-open.png";
    }
    if(synth.speaking != true) {
      imag.src = "assets/images/smiling.png";
    }
  },1)
}