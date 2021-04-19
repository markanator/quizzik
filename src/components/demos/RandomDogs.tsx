import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../common/loading-spinner";
import ErrorMessage from "../common/error-message";
import useFetchDogs from "../hooks/useFetchDogs";

interface Props {}

function RandomDogs({}: Props): ReactElement {
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
          <img key={`dod-${idx}`} src={dog} height="150px" width="auto" />
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
