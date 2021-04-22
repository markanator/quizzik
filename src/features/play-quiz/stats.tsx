import { ReactElement } from "react";
import "./stats.css";

interface StatProps {
  label: string;
  value: number | string;
}

function Stat({ label, value }: StatProps) {
  return (
    <li className="stats__stat-container">
      <div className="stats__stat-label">{label}:</div>
      <div className="stats__stat-value">{value}</div>
    </li>
  );
}

/**
 * The Stats component renders the score and current question number.
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.questionNumber
 * @param {number} props.totalQuestions
 */
interface Props {
  score: number;
  questionNumber: number;
  totalQuestions: number;
}
function Stats({ score, questionNumber, totalQuestions }: Props): ReactElement {
  return (
    <ul className="stats">
      <Stat label="Score" value={score} />
      <Stat label="Question" value={`${questionNumber} / ${totalQuestions}`} />
    </ul>
  );
}

export default Stats;
