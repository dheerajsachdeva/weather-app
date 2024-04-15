import React from 'react';

const Home: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    
    console.log('Searching for:', searchTerm);
  };

  return (
    <>
      
      <div style={{ padding: '20px' }}>
        <h2>Welcome to the Weather App!</h2>
        <p>
          You can view weather forecasts for different locations by clicking on the city name in the table below. Click on the table heads to sort the data.
        </p>
    
      </div>
    </>
  );
};

export default Home;
