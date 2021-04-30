// help from: https://fettblog.eu/typescript-react-typeing-custom-hooks/

import axios from "axios";
import { useEffect, useState } from "react";
import { IApiResponse, IDogStateTypes } from "../types/types";

/**
 *  Custom Hook...
 * @param {number} amount Amount of dogs to fetch
 * @returns isLoading, isError, statusMessage, data...
 */

function useFetchDogs(amount: number): [boolean, boolean, string[] | null] {
  const [dogFetch, setDogFetch] = useState<IDogStateTypes>({
    isLoading: true,
    isError: false,
    statusMessage: "",
    data: [],
  });

  const fetchDoggos = () => {
    axios
      .get(`https://dog.ceo/api/breed/labrador/images/random/${amount}`)
      .then((res: IApiResponse) => {
        console.log(res.data);
        setDogFetch({
          ...dogFetch,
          isLoading: false,
          statusMessage: res.data.status,
          data: res.data.message,
        });
      })
      .catch((err) => {
        console.error(err);
        setDogFetch({
          ...dogFetch,
          isLoading: false,
          isError: true,
          statusMessage: "Request failed, try again later.",
          data: null,
        });
      });
  };

  useEffect(() => {
    fetchDoggos();
  }, []);

  const { isLoading, isError, data } = dogFetch;
  return [isLoading, isError, data];
}

export default useFetchDogs;
