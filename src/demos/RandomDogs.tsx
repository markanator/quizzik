import { ReactElement } from "react";
import ErrorMessage from "../components/error-message";
import LoadingSpinner from "../components/loading-spinner";
import useFetchDogs from "../hooks/useFetchDogs";

// interface Props {}

function RandomDogs(): ReactElement {
  const [isLoading, isError, data] = useFetchDogs(5);

  let contents;
  if (isLoading) {
    contents = <LoadingSpinner />;
  } else if (isError) {
    // add no data error check
    contents = <ErrorMessage>An error occurred!</ErrorMessage>;
  } else {
    contents = (
      <>
        {(data as string[])?.map((dog, idx) => (
          <img
            key={`dod-${idx}`}
            alt="a dog"
            src={dog}
            height="150px"
            width="auto"
          />
        ))}
      </>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        maxWidth: "60vw",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {contents}
    </div>
  );
}

export default RandomDogs;
