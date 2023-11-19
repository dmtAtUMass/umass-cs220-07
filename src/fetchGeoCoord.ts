import fetch from "../include/fetch.js";

export interface GeoCoord {
  lat: number;
  lon: number;
}

export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  const searchURL = new URL("https://220.maxkuechen.com/geoCoord/search");
  searchURL.searchParams.set("q", query);

  return fetch(searchURL.toString())
    .then(response => response.json())
    .then(json => {
      if (Array.isArray(json) && json.length > 0) {
        return Promise.resolve({ lat: Number.parseFloat(json[0].lat), lon: Number.parseFloat(json[0].lon) });
      } else {
        return Promise.reject(new Error("No results found for query."));
      }
    });
}
