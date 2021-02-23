import { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const [time, setTime] = useState(25 * 60); // 25 min em seg
  const [active, setActive] = useState(false); // pausado no início

  const minutes = Math.floor(time / 60); // Arredondando pra baixo
  const seconds = time % 60; // Resto da divião para atribuir aos segundos

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); 
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  // 25 -> '25' -> '2' '5' -> vai dividir a string em um array para cada caractere com o .split;

  // 5 -> '5' -> '05' -> '0' '5' -> .padStart vai verificar se existe mais que um caractere, se existir apenas um vai preenhcer o lado esquerdo com '0' e depois vai dividir a string em um array para cada caractere com o .split;

  function startCountdown() {
    setActive(true); // ativa quando o usuário clicar
  }
  
  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1); // diminiuindo o contador
      }, 1000);
    }
  }, [active, time]);

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

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Inciar um ciclo
      </button>
    </div>
  );
}