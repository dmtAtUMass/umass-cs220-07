import { URL } from "url"; // Import the URL class from the url library

export function makeSearchURL(root: string, query: string): string {
  // Construct a new URL object using the resource URL
  const searchURL = new URL(root);

  // Access the searchParams field of the constructed url
  // The field holds an instance of the URLSearchParams
  // Add a new "q" parameter with the value of the functions input
  searchURL.searchParams.append("q", query);

  return searchURL.toString(); // Return the resulting complete URL
}