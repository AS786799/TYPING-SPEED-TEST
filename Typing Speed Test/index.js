const quotes = [
    "Typing tests help improve speed and accuracy. They are essential for anyone who works frequently on a computer or wants to improve their productivity.",
    "JavaScript is one of the most versatile programming languages. It runs in the browser and is used for building dynamic and interactive web applications.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment."
  ];
  
  const quoteEl = document.getElementById('quote');
  const inputEl = document.getElementById('input');
  const timeEl = document.getElementById('time');
  const wpmEl = document.getElementById('wpm');
  const accuracyEl = document.getElementById('accuracy');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  
  let startTime, interval, currentQuote;
  
  function startTest() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = currentQuote;
    inputEl.disabled = false;
    inputEl.value = "";
    inputEl.focus();
  
    startTime = new Date().getTime();
    timeEl.textContent = "0";
    wpmEl.textContent = "0";
    accuracyEl.textContent = "0";
  
    clearInterval(interval);
    interval = setInterval(() => {
      let elapsed = Math.floor((new Date().getTime() - startTime) / 1000);
      timeEl.textContent = elapsed;
    }, 1000);
  }
  
  function endTest() {
    clearInterval(interval);
    const elapsedTime = (new Date().getTime() - startTime) / 1000;
    const typedText = inputEl.value.trim();
    const wordCount = typedText.split(/\s+/).length;
  
    const wpm = Math.round((wordCount / elapsedTime) * 60);
    wpmEl.textContent = isNaN(wpm) ? 0 : wpm;
  
    const correctChars = countCorrectCharacters(currentQuote, typedText);
    const accuracy = Math.round((correctChars / currentQuote.length) * 100);
    accuracyEl.textContent = accuracy;
  
    inputEl.disabled = true;
  }
  
  function countCorrectCharacters(original, typed) {
    let count = 0;
    for (let i = 0; i < Math.min(original.length, typed.length); i++) {
      if (original[i] === typed[i]) count++;
    }
    return count;
  }
  
  startBtn.addEventListener('click', startTest);
  
  inputEl.addEventListener('input', () => {
    if (inputEl.value.length >= currentQuote.length) {
      endTest();
    }
  });
  
  resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    quoteEl.textContent = 'Click "Start" to begin!';
    inputEl.value = "";
    inputEl.disabled = true;
    timeEl.textContent = "0";
    wpmEl.textContent = "0";
    accuracyEl.textContent = "0";
  });
  