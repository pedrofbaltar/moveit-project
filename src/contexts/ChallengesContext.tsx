import { createContext, useState, ReactNode } from 'react';
import challenges from "../../challenges.json";

interface Challenge {
  type: 'body' | 'eye'; // pelo fato de ser apenas dois valores possiveis, podemso colocar dessa forma (ou x ou y)
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experinceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge; 
  levelUp: () => void; // retorna uma function sem retorno (void)
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experinceToNextLevel = Math.pow((level + 1) * 4, 2); // (level + 1) * 4 elevado 2

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length); // pegando desafio aleatorio do arquivo .json
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{  
        level,
        currentExperience,
        experinceToNextLevel,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}