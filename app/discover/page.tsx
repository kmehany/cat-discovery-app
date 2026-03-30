"use client";
import "../discover.css"
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
        "x-api-key": "live_abVz98BqohELAw5P4zOs9WkVCYcH2xjp0qpsQzQtwGh0qiKVsUIQwbqVR1ynbKAT",
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
    const temperament = randomCat.breeds[0].temperament;

    const isBanned =
        bannedAttributes.includes(breedName) ||
        bannedAttributes.includes(origin) ||
        bannedAttributes.includes(temperament);

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
    <h1 className="title">Welcome to Kerolos' Discover Page!</h1>

    <div className="button">
      <button className="discover button" onClick={getRandomCat}>
        Discover A Cat
      </button>
    </div>

    <div className="main">
      
      <div className="card">
        {catData ? (
          <>
            <img className="cat-img" src={catData.url} alt="cat" />

            <p onClick={() => banAttribute(catData.breeds[0].name)}>
              Name: {catData.breeds[0].name}
            </p>

            <p onClick={() => banAttribute(catData.breeds[0].origin)}>
              Origin: {catData.breeds[0].origin}
            </p>

            <p onClick={() => banAttribute(catData.breeds[0].temperament)}>
              Temperament: {catData.breeds[0].temperament}
            </p>
          </>
        ) : (
          <p>Start</p>
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