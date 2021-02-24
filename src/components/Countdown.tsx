import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60); // 25 min em seg
  const [isActive, setIsActive] = useState(false); // pausado no início
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60); // Arredondando pra baixo
  const seconds = time % 60; // Resto da divião para atribuir aos segundos

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); 
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  // 25 -> '25' -> '2' '5' -> vai dividir a string em um array para cada caractere com o .split;

  // 5 -> '5' -> '05' -> '0' '5' -> .padStart vai verificar se existe mais que um caractere, se existir apenas um vai preenhcer o lado esquerdo com '0' e depois vai dividir a string em um array para cada caractere com o .split;

  function startCountdown() {
    setIsActive(true); // ativa quando o usuário clicar
  };
  
  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false); // desliga quando o usuario clicar novamente
    setTime(0.1 * 60) // resetando para o valor inicial de 25 minutos
  };

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1); // diminiuindo o contador
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

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
          Ciclo enecerrado
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