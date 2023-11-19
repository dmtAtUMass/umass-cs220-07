import assert from "assert";
import { fetchGeoCoord } from "./fetchGeoCoord.js";

describe("fetchGeoCoord", () => {
  it("follows type specification", () => {
    const promise = fetchGeoCoord("University of Massachusetts Amherst");

    return promise.then(result => {
      assert(typeof result === "object"); //  Assert the result is an object
      assert(typeof result.lon === "number"); // Assert that the lon value is a number
      assert(typeof result.lat === "number"); // Assert that the lat value is a number
      assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
    });
  });
  it("returns an Error when query doesn't return any results", () => {
    const promise = fetchGeoCoord("%^#@%");
    return promise.catch(result => {
      assert(result instanceof Error);
      assert(result.message === "No results found for query.");
    });
  });

  it("correctly returns lat and lon for a query with only one result", () => {
    const promise = fetchGeoCoord("University of Massachusetts Amherst");

    return promise.then(result => {
      assert(typeof result === "object");
      assert(result.lon === -72.52991477067445);
      assert(result.lat === 42.3869382);
      assert(Object.keys(result).length === 2);
    });
  });

  it("correctly returns the first lat and lon for a query with more than one result", () => {
    const promise = fetchGeoCoord("connecticut chipotle");

    return promise.then(result => {
      assert(typeof result === "object");
      assert(result.lon === -72.9269187);
      assert(result.lat === 41.3063497);
      assert(Object.keys(result).length === 2);
    });
  });
});
