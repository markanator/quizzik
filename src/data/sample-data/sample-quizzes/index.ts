import beginnerJavascriptQuiz from "./beginner-javascript-quiz";
import videoGamesQuiz from "./video-games-quiz";
import musicQuiz from "./music-quiz";
import { QuizType } from "types/LoadDateTypes";

const quizzes: QuizType[] = [musicQuiz, videoGamesQuiz, beginnerJavascriptQuiz];

export default quizzes;
