import { useContext, useEffect } from "react";
import { CountdownContext } from '../contexts/CountdownContext';
import styles from "../styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown, 
  } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); 
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton} onClick={resetCountdown}>
          Ciclo encerrado
          <img src="icons/check.svg" alt="Check"/>
        </button>
      ) : (
        <>
          { isActive ? (
          <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
            Abandonar ciclo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#2e384d">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"/>
            </svg>
          </button>
          ) : (
            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
              Iniciar um ciclo 
              <img src="icons/play.svg" alt="Play"/>
            </button>
          )}
        </>
      )}      
    </div>
  );
}