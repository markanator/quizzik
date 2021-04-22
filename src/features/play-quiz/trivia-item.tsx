import React, { useState } from "react";
import shuffle from "utils/shuffle";
import "./trivia-item.css";

/**
 * The TriviaItem component renders an individual trivia question and waits for a user's answer.
 * @param {object} props
 * @param {string} props.correctAnswer
 * @param {string[]} props.incorrectAnswers
 * @param {string} props.question
 * @param {() => void} props.onNextClick
 * @param {(boolean) => void} props.onAnswerSelected
 */

interface Props {
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  onNextClick: () => void;
  onAnswerSelected: (arg0: boolean) => void;
}

function TriviaItem({
  correctAnswer,
  incorrectAnswers,
  question,
  onNextClick,
  onAnswerSelected,
}: Props): React.ReactElement {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const hasPickedAnswer = selectedAnswer !== null;
  // const [playCorrect] = useSound(correctSound, { volume: 0.5 });
  // const [playIncorrect] = useSound(incorrectSound, { volume: 0.5 });

  const allAnswers = [correctAnswer, ...incorrectAnswers];
  // useState can take a function that is run only when the state is initialized:
  const [shuffledAnswers] = useState(() => shuffle(allAnswers));

  let nextButtonClassName = "trivia-item__button trivia-item__next-button";
  if (!hasPickedAnswer) nextButtonClassName += " trivia-item__button--disabled";

  const onAnswerClick: React.MouseEventHandler<HTMLButtonElement> = ({
    target,
  }) => {
    const playerAnswer = (target as HTMLButtonElement).innerHTML;
    setSelectedAnswer(playerAnswer);
    const wasPlayerCorrect = playerAnswer === correctAnswer;
    // if (wasPlayerCorrect) playCorrect();
    // else playIncorrect();
    onAnswerSelected(wasPlayerCorrect);
  };

  return (
    <div>
      <p className="trivia-item__question">{question}</p>
      <ul className="trivia-item__answers">
        {shuffledAnswers.map((answer) => {
          let className = "trivia-item__button";
          if (hasPickedAnswer) {
            const pickedThisAnswer = answer === selectedAnswer;
            const isThisCorrect = answer === correctAnswer;
            if (pickedThisAnswer && isThisCorrect) {
              className += " trivia-item__button--correct";
            } else if (pickedThisAnswer && !isThisCorrect) {
              className += " trivia-item__button--incorrect";
            } else {
              className += " trivia-item__button--disabled";
            }
          }

          return (
            <li key={answer}>
              <button
                className={className}
                onClick={onAnswerClick}
                disabled={hasPickedAnswer}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className={nextButtonClassName}
        onClick={onNextClick}
        disabled={!hasPickedAnswer}
      >
        Next ➡
      </button>
    </div>
  );
}

export default TriviaItem;
