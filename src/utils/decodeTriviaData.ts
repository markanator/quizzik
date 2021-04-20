import he from "he";

export default function decodeTriviaData(data: any[]) {
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
