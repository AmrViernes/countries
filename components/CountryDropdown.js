"use client"

// components/CountryDropdown.js
import { useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

const CountryDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    // Fetch country data from an external API
    axios.get('https://6555daed84b36e3a431e7d1c.mockapi.io/api/v1/countries')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, [countries]);

  const handleCountryChange = (event) => {
    const selectedCountry = countries.find(country => country.name === event.target.value);
    setSelectedCountry(selectedCountry);
  };

  return (
    <section className='flex justify-center items-center space-x-6'>
      <select onChange={handleCountryChange} className='p-5 rounded-md'>
        <option value="">Select a country</option>
        {countries.map(country => (
          <option key={country.name} value={country.name} className='p-2'>
            {country.flag + ' ' + country.name}
          </option>
        ))}
      </select>

      {selectedCountry && (
        <section>
          <p>{selectedCountry.currency + ' ' + selectedCountry.gdpPerCapita}</p>
        </section>
      )}
    </section>
  );
};

export default CountryDropdown;
