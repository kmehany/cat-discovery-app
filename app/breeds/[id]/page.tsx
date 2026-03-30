
//BreedDetails
export default async function BreedDetails({params}: any) {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const breeds = await response.json();

    const breedID = params.id;

    const breed = breeds.find((oneBreed: any)=> oneBreed.id === breedID);

    return (
        <div>
            <h1>{breed.name}</h1>
            {breed.image && (<img src={breed.image.url} alt={breed.name}width="300" />)}
            <p>{breed.description}</p>
            <p>Origin: {breed.origin}</p>
            <p> Temperament: {breed.temperament}</p>
        </div>
    )
} 
