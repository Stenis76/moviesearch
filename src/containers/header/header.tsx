import React from "react";
import "./header.styles.css";
import Profile from "../../components/profile/profile";
import SearchBar from "../../components/searchbar/searchbar";
import logo from "../../assets/logo.png";
import { faFolderMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Iprops {
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
}

class Header extends React.Component<Iprops> {
  render() {
    return (
      <div className="headerContainer">
        <div className="hamburgerMenu" onClick={this.props.toggleSidebar}>
          <FontAwesomeIcon icon={faFolderMinus} />
        </div>
        {/* <Profile /> */}
        <img src={logo} style={{ height: "70%" }} alt={"site title"} />
        <SearchBar
          // id={1}
          // label="Vad söker du?"
          // predicted="Spiderman"
          // locked={false}
          // active={false}
          // error=""
          value=""
          setSearchQuery={this.props.setSearchQuery}
        />
      </div>
    );
  }
}

export default Header;
