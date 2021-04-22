import he from "he";

export default function decodeTriviaData(
  data: QuestionDataType[]
): QuestionDataType[] {
  const decodedData = data.map((item) => {
    return {
      ...item,
      question: he.decode(item.question),
      correct_answer: he.decode(item.correct_answer),
      incorrect_answers: item.incorrect_answers.map((incorrect: string) =>
        he.decode(incorrect)
      ),
    };
  });
  return decodedData;
}

export interface QuestionDataType {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
