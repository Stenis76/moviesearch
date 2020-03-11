import React from "react";
import "./header.styles.css";
import Profile from "../../components/profile/profile";
import SearchBar from "../../components/searchbar/searchbar";
import logo from "../../assets/logo.png";

interface Iprops {
  setSearchQuery: (query: string) => void;
}

class Header extends React.Component<Iprops> {
  errorTest = () => {
    if (1 > 99) {
      // Simulate a JS error
      throw new Error("I craaashed!");
    }
    return <Profile />;
  };

  render() {
    return (
      <div className="headerContainer">
        {this.errorTest()}
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
