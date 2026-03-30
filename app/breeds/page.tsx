import { div } from "three/tsl";
import Link from "next/link";

export default async function BreedsPage() {

    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    //to take the response and converts it into real data
    const breeds = await response.json();
    return (
    <div>
      <h1>Breeds Page</h1>

      {breeds.map((breed: any) => (
        <div key={breed.id}>
          <Link href={`/breeds/${breed.id}`}>
            {breed.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

//--------------------



