import React from 'react';
import "./headerStyle.css";
import Profile from "../../components/profile/Profile"
import SearchBar from '../../components/search/SearchBar';

class Header extends React.Component {

  render() {
    return (
      <div className="headerContainer">
      <Profile />
      <h1>Moviestar</h1>
      <SearchBar 
      // id={1}
      label="Vad söker du?"
      predicted="Spiderman"
      locked={false}
      active={false}
      error=""
      value=""
      />
      
      
      </div>
    )
  };
}

export default Header

