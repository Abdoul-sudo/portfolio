import { useState, useEffect } from 'react';
import { spatialAudio } from '../utils/spatialAudio';
import '../styles/audioToggle.css';

/**
 * Audio Toggle Button
 * Enables/disables spatial audio for metaball interactions
 */
const AudioToggle = ({ onAudioChange }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleToggle = async () => {
    // Initialize audio context on first interaction (browser requirement)
    if (!isInitialized) {
      const success = await spatialAudio.init();
      if (success) {
        setIsInitialized(true);
      } else {
        console.warn('Failed to initialize audio');
        return;
      }
    }

    const newState = spatialAudio.toggle();
    setIsEnabled(newState);

    if (onAudioChange) {
      onAudioChange(newState);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      spatialAudio.setEnabled(false);
    };
  }, []);

  return (
    <button
      className={`audio-toggle ${isEnabled ? 'enabled' : ''}`}
      onClick={handleToggle}
      aria-label={isEnabled ? 'Disable spatial audio' : 'Enable spatial audio'}
      title={isEnabled ? 'Turn off sound' : 'Turn on sound'}
    >
      {isEnabled ? (
        // Sound ON icon - speaker with waves
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="audio-icon"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        // Sound OFF icon - speaker with X
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="audio-icon"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
};

export default AudioToggle;
