const startButton = document.getElementById('startButton');
const outputDiv = document.getElementById('output');
const imgButton = document.getElementById('imgButton');
const imgStartButton = document.getElementById('imgStartButton');

// Check if the browser supports the Web Speech API
if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert('Sorry, your browser does not support Speech Recognition.');
    startButton.disabled = true;
    imgStartButton.disabled = true;
} else {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = true; // Display interim results
    recognition.continuous = false; // Stop after one session

    startButton.addEventListener('click', () => {
        recognition.start();
        startButton.disabled = true;
        startButton.textContent = 'STOP...';
    });
    
    imgButton.addEventListener('click', () => {
        recognition.start();
        imgButton.disabled = true;
        imgStartButton.src = "img/record-button-thumb.png";
    });

    recognition.addEventListener('result', (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');

        outputDiv.textContent = transcript;
    });

    recognition.addEventListener('end', () => {
        startButton.disabled = false;
        startButton.textContent = 'Start Listening';
    });
    
    recognition.addEventListener('end', () => {
        imgButton.disabled = false;
        imgStartButton.src = "img/mic-1.png";
    });

    recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error:', event.error);
        startButton.disabled = false;
        startButton.textContent = 'Start Listening';
    });
    
    recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error:', event.error);
        imgButton.disabled = false;
        imgStartButton.src = "img/mic-1.png";
    });
}

