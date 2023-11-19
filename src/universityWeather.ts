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
  return fetchUniversities(universityQuery)
    .then((universities) => {
      if (universities.length === 0) {
        throw new Error("No results found for query.");
      }
      
      const fetchPromises = universities.map((university) => {
        const transformedName = transformName ? transformName(university) : university;
        return fetchGeoCoord(transformedName)
          .then((geoCoord) => fetchCurrentTemperature(geoCoord))
          .then((temperature) => ({ name: university, temperature }));
      });
      
      return Promise.all(fetchPromises)
        .then((results) => {
          const averageTemperatures: AverageTemperatureResults = { totalAverage: 0 };
          let totalTemperature = 0;
          results.forEach((result) => {
            const localAvg = result.temperature.temperature_2m.reduce((a, b) => a + b) / result.temperature.temperature_2m.length;
            averageTemperatures[result.name] = localAvg;
            totalTemperature += localAvg;
          });
          averageTemperatures.totalAverage = totalTemperature / results.length;
          
          return averageTemperatures;
        });
    });
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  return fetchUniversityWeather("University of Massachusetts", (s) => s.replace("at", ""))
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  return fetchUniversityWeather("University of California", (s) => s.replace("at", ""))
}
