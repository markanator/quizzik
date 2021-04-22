/* eslint-disable @typescript-eslint/no-explicit-any */
async function fetcher(url: string): Promise<any> {
  const response = await fetch(url);

  // Stops the chain of thens and kicks things over to the catch.
  if (!response.ok) {
    throw Error(
      `Something went wrong, server responded with a ${response.status} status.`
    );
  }

  const json = await response.json();
  return json;
}

export default fetcher;
