

let audioContext: AudioContext | null = null;

// Function to initialize AudioContext on user interaction
const initializeAudioContext = () => {
    if (typeof window !== 'undefined' && !audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // Resume context if it's suspended (required by modern browsers)
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
};

// Add a global event listener to initialize on the first user interaction
if (typeof window !== 'undefined') {
    ['click', 'keydown', 'touchstart'].forEach(eventName => {
        document.addEventListener(eventName, initializeAudioContext, { once: true });
    });
}


const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    initializeAudioContext();
    if (!audioContext || audioContext.state !== 'running') return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration / 1000);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration / 1000);
};

export const playSound = (sound: 'win' | 'lose' | 'click' | 'match' | 'noMatch' | 'eat' | 'coin' | 'lineClear' | 'gameOver' | 'gameWin' | 'tick' | 'land') => {
    try {
        switch (sound) {
            case 'gameWin': // More triumphant win sound for finishing a game
                playTone(523.25, 100); // C5
                setTimeout(() => playTone(659.25, 100), 120); // E5
                setTimeout(() => playTone(783.99, 100), 240); // G5
                setTimeout(() => playTone(1046.50, 200), 360); // C6
                break;
            case 'win': // Short, positive feedback for a correct answer
                playTone(659.25, 150); // E5
                break;
            case 'lose': // Short, negative feedback
                playTone(220, 200, 'square'); // A3
                break;
            case 'gameOver': // Longer, more final losing sound
                playTone(220, 150, 'sawtooth'); // A3
                setTimeout(() => playTone(164.81, 250, 'sawtooth'), 150); // E3
                break;
            case 'click':
                playTone(880, 50, 'triangle'); // A5
                break;
            case 'match':
                playTone(783.99, 100); // G5
                break;
            case 'noMatch':
                playTone(349.23, 150, 'square'); // F4
                break;
            case 'eat':
            case 'coin':
                playTone(1046.50, 75); // C6
                break;
            case 'lineClear':
                playTone(523.25, 50); // C5
                setTimeout(() => playTone(783.99, 150), 50); // G5
                break;
            case 'tick':
                playTone(1300, 50, 'triangle');
                break;
            case 'land':
                playTone(150, 75, 'square');
                break;
        }
    } catch (e) {
        console.error("Could not play sound", e);
    }
};