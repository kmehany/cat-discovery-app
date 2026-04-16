"use client";
import "../discover.css";
import BanList from "./components/BanList";
import { useState } from "react";

export default function DiscoverPage() {
  const [catData, setCatData] = useState<any>(null);
  const [bannedAttributes, setBannedAttributes] = useState<string[]>([]);

  async function getRandomCat() {
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1",
      {
        headers: {
          "x-api-key":
            "live_abVz98BqohELAw5P4zOs9WkVCYcH2xjp0qpsQzQtwGh0qiKVsUIQwbqVR1ynbKAT",
        },
      }
    );

    const data = await response.json();
    const randomCat = data[0];

    if (!randomCat?.breeds?.length) {
      return getRandomCat();
    }

    const breedName = randomCat.breeds[0].name;
    const origin = randomCat.breeds[0].origin;
    const temperamentList = randomCat.breeds[0].temperament.split(", ");

    const breedIsBanned = bannedAttributes.includes(breedName);
    const originIsBanned = bannedAttributes.includes(origin);
    const temperamentIsBanned = temperamentList.some((item: string) =>
    bannedAttributes.includes(item)
  );

  const isBanned = breedIsBanned || originIsBanned || temperamentIsBanned;

    if (isBanned) {
      return getRandomCat();
    }

    setCatData(randomCat);
  }

  function banAttribute(attribute: string) {
    if (!bannedAttributes.includes(attribute)) {
      setBannedAttributes([...bannedAttributes, attribute]);
    }
  }

  function unbanAttribute(attribute: string) {
    const newList = bannedAttributes.filter((item) => item !== attribute);
    setBannedAttributes(newList);
  }

  return (
    <div className="page">
      <h1 className="title">Welcome to Kerolos&apos; Discover Page!</h1>
      <p className="subtitle">Click the button to discover a cat, then click an attribute to ban it.</p>

      <button className="discover-btn" onClick={getRandomCat}>
        Discover a Cat
      </button>

      <div className="main">
        <div className="card">
          <h2 className="card-title"></h2>

          {catData ? (
            <>
              <img className="cat-img" src={catData.url} alt="cat" />

              <button
                className="attribute-btn"
                onClick={() => banAttribute(catData.breeds[0].name)}
              >
                Name: {catData.breeds[0].name}
              </button>

              <button
                className="attribute-btn"
                onClick={() => banAttribute(catData.breeds[0].origin)}
              >
                Origin: {catData.breeds[0].origin}
              </button>

              <div>
              <p className="temperament-label">Temperaments:</p>

              {catData.breeds[0].temperament.split(", ").map((item: string) => (
                <button
                  key={item}
                  className="attribute-btn"
                  onClick={() => banAttribute(item)}>
                  {item}
                </button>
              ))}
            </div>
            </>
          ) : (

            <button className="button2" onClick={getRandomCat}>Click to Discover a Cat </button>

          )}
        </div>

        <div className="card">
          <BanList
            bannedAttributes={bannedAttributes}
            unbanAttribute={unbanAttribute}
          />
        </div>
      </div>
    </div>
  );
}