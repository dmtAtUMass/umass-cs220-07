import { URL } from "url"; // Import the URL class from the url library

export function makeSearchURL(root: string, query: string[][]): string {
  // Construct a new URL object using the resource URL
  const searchURL = new URL(root);

  // Access the searchParams field of the constructed url
  // The field holds an instance of the URLSearchParams
  query.forEach(q => searchURL.searchParams.append(q[0], q[1]));
  // console.log(searchURL.toString())
  return searchURL.toString(); // Return the resulting complete URL
}
