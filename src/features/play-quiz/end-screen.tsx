import { motion } from "framer-motion";
import { ReactElement } from "react";
import "./end-screen.css";

interface EndStatProps {
  label: string;
  value: number | string;
}

function EndStat({ label, value }: EndStatProps) {
  return (
    <div className="end-screen__stat">
      <div className="end-screen__stat-label">{label}</div>
      <div className="end-screen__stat-value">{value}</div>
    </div>
  );
}

/**
 * EndScreen renders the final game stats.
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.bestScore
 * @param {() => void} props.onRetryClick A function to run when the retry button is clicked.
 * @param {number} props.playTime Total play time in seconds
 */

interface EndScreenProps {
  score: number;
  bestScore: number;
  playTime: number;
  onRetryClick: () => void;
}
function EndScreen({
  score,
  bestScore,
  onRetryClick,
  playTime,
}: EndScreenProps): ReactElement {
  const minutes = `${Math.floor(playTime / 60)}`.padStart(2, "0");
  const seconds = `${Math.floor(playTime % 60)}`.padStart(2, "0");
  const timeString = `${minutes}:${seconds}`;

  return (
    <div className="end-screen">
      <h1>Quiz Complete!</h1>
      <motion.div
        className="end-screen__trophy"
        initial={{ rotate: 0, originX: 0.5, originY: 0.5 }}
        animate={{ rotate: 360 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      >
        🏆
      </motion.div>
      <EndStat label="Score" value={score} />
      <EndStat label="Best Score" value={bestScore} />
      <EndStat label="Time to Complete" value={timeString} />
      <button className="end-screen__button" onClick={onRetryClick}>
        Retry?
      </button>
    </div>
  );
}

export default EndScreen;
