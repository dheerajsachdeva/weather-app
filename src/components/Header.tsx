import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


interface Props {
    onSearch: (searchTerm: string) => void;
  }
  
  const Header: React.FC<Props> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSearch = () => {
      onSearch(searchTerm);
    };
  
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
         
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Header;