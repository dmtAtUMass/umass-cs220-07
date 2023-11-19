import fetch from "../include/fetch.js";
import { makeSearchURL } from "./utility.js";

export interface GeoCoord {
  lat: number;
  lon: number;
}

export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  const queries = [["q", query]]
  const searchURL = makeSearchURL("https://220.maxkuechen.com/geoCoord/search", queries);
  return fetch(searchURL)
    .then(response => response.json())
    .then((json : {lat: string, lon: string}[]) => {
      if (Array.isArray(json) && json.length > 0) {
        return Promise.resolve({ lat: Number.parseFloat(json[0].lat), lon: Number.parseFloat(json[0].lon) });
      } else {
        return Promise.reject(new Error("No results found for query."));
      }
    });
}
