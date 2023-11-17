import fetch from "../include/fetch.js";

export interface GeoCoord {
  lat: number;
  lon: number;
}

export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  const baseUrl = "https://220.maxkuechen.com/geoCoord/search";
  const apiUrl = `${baseUrl}?q=${encodeURIComponent(query)}`;

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch geo-coordinate. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error("No results found for query.");
      }
      const firstResult = data[0];
      const lon = Number.parseFloat(firstResult.lon);
      const lat = Number.parseFloat(firstResult.lat);

      if (isNaN(lon) || isNaN(lat)) {
        throw new Error("Invalid geo-coordinate format in the response.");
      }
      return { lon, lat };
    });
}
