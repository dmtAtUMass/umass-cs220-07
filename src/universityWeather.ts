import { fetchUniversities } from "./fetchUniversities.js";
// import fetch from "../include/fetch.js";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";
import { makeSearchURL } from "./utility.js"

export interface AverageTemperatureResults {
  totalAverage: number;
  [key: string]: number;
}

export function fetchUniversityWeather(
  universityQuery: string,
  transformName?: (s: string) => string
): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversities(universityQuery).then(universities => transformName ? universities.map(transformName) : universities)
    .then(universities => Promise.all(universities.map(university => fetchGeoCoord(university))))
    .then(coords => Promise.all(coords.map(coord => fetchCurrentTemperature(coord))))
    .then(temperatures => {
      const results: AverageTemperatureResults = { totalAverage: 0 };
      temperatures.forEach(temperature => {
        const average = temperature.temperature_2m.reduce((a, b) => a + b, 0) / temperature.temperature_2m.length;
        results[temperature.time[0]] = average;
        results.totalAverage += average;
      });
      results.totalAverage /= temperatures.length;
      return results;
    });
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  return fetchUniversityWeather("University of Massachusetts at Amherst");
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  return fetchUniversityWeather("University of California at Berkeley");
}
