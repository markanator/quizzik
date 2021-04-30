import quizzes from "data/sample-data/sample-quizzes";
import React, { ReactElement, useState } from "react";
import { Form, SelectInput, TextInput } from "./FormComponent";

interface IFormValues {
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  // questions?: QuestionType[];
  // createdAt?: firebase.firestore.Timestamp;
  // lastModifiedAt?: firebase.firestore.Timestamp;
  // ownerId?: string;
  // ownerName?: string;
}

interface Props {
  initialData: IFormValues;
  isSaving: boolean;
  onSave: (arg0: IFormValues) => void;
  onDelete: () => void;
}

const diffArr = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const QuizForm = ({
  initialData = {} as any,
  onSave,
  onDelete,
  isSaving,
}: Props): ReactElement => {
  const [formValues, setFormValues] = useState<IFormValues>({
    title: initialData.title ?? "",
    description: initialData.description ?? "",
    difficulty: initialData.difficulty ?? "easy",
    tags: initialData.tags ?? [],
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formValues);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <Form onSubmit={onSubmit} disabled={isSaving}>
      <h2>Quiz Info</h2>
      <TextInput
        label="Title"
        name="title"
        value={formValues.title}
        onChange={onTextChange}
      />
      <TextInput
        label="Description"
        name="description"
        value={formValues.description}
        onChange={onTextChange}
      />
      <SelectInput
        label="Difficulty"
        name="difficulty"
        value={formValues.difficulty}
        options={diffArr}
        onChange={onSelectChange}
      />
      <h2>Questions</h2>
      <p>Todo!</p>
      <div className="quiz-form__buttons">
        <button type="submit">Save Quiz</button>
        <button type="button" onClick={onDelete}>
          Delete Quiz
        </button>
      </div>
    </Form>
  );
};

export default QuizForm;
