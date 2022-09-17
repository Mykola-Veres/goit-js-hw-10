
export async function fetchCountries(countryName) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
  if (!response.ok) { throw Error(response.statusText)} 
  return await response.json()}

    // function fetchCountries(countryName) {
    //   return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
    //   .then(response => { if(!response.ok)
    //     {throw Error(response.statusText)}
    //     return response.json()})}