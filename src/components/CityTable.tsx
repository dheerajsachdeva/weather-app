import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface City {
  name: string;
  cou_name_en: string;
  timezone: string;
}

const CityTable: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortedColumn, setSortedColumn] = useState<keyof City>('name');
const [isAscending, setIsAscending] = useState(true); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100');
        setCities(response.data.results);
        setFilteredCities(response.data.results);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchTerm, cities]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  
  const handleSort = (columnName: keyof City) => {
    const sortedCities = [...filteredCities].sort((a, b) => {
      if (typeof a[columnName] === 'string' && typeof b[columnName] === 'string') {
          if (columnName === sortedColumn) {
          return isAscending ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName]);
        } else {
         
          return a[columnName].localeCompare(b[columnName]);
        }
      }
    
      return 0;
    });
   
    setFilteredCities(sortedCities);
    
    setIsAscending(!isAscending);
   
    setSortedColumn(columnName);
  };
  

  return (
    <div>
      
      <input
        type="text"
        placeholder="Search city..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>City Name</th>
            <th onClick={() => handleSort('cou_name_en')}>Country</th>
            <th onClick={() => handleSort('timezone')}>Timezone</th>
            </tr>
        </thead>
        <tbody>
          {filteredCities.map(city => (
            <tr key={city.name}>
              <Link to = {`/cityDetails/${city.name}`}><td>{city.name.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}</td></Link>
              <td>{city.cou_name_en}</td>
              <td>{city.timezone}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;
