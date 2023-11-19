import fetch from "../include/fetch.js";
import { makeSearchURL } from "./utility.js";
export function fetchUniversities(query: string): Promise<string[]> {
  const searchURL = makeSearchURL("https://220.maxkuechen.com/universities/search", [["name", query]]);
  return fetch(searchURL)
    .then(response => response.json())
    .then((json : {name : string}[]) => json.map((university : {name : string}) => university.name));
}
