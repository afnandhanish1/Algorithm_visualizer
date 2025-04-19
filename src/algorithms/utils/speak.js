export const speak = (text, voice) => {
    if (!text || !window.speechSynthesis) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
  };