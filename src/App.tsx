import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';


const App: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
  };
  return (
    <>
    <Header onSearch={handleSearch}/>
   <Outlet/>
    </>
  );
}

export default App;
