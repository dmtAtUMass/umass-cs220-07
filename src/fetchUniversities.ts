import fetch from "../include/fetch.js";
import{
  makeSearchURL,
} from  "./utility.js";
export function fetchUniversities(query: string): Promise<string[]> {
  // TODO
  const searchURL = new URL("https://220.maxkuechen.com/universities/search");
  searchURL.searchParams.set("name", query);
  return fetch(searchURL).then(response => response.json()).then(json => json.map((university: { name: any; }) => university.name))
}
