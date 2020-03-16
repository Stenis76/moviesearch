import React from "react";
import "./header.styles.css";
// import Profile from "../../components/profile/profile";
import SearchBar from "../../components/searchbar/searchbar";
import logo from "../../assets/logo.png";
import { faFolderMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spring, config } from "react-spring/renderprops";

interface Iprops {
  toggleSidebar: () => void;
  hideLogo: boolean;
}
interface Istate {
  toggle: boolean;
}

class Header extends React.Component<Iprops, Istate> {
  state = {
    toggle: true
  };

  toggle = () => this.setState({ toggle: !this.state.toggle });

  //Able to simulate ErrorBoundaries
  errorTest = () => {
    if (1 > 99) {
      // Simulate a JS error
      throw new Error("I craaashed!");
    }
    return <FontAwesomeIcon icon={faFolderMinus} />;
  };

  myCallback = () => {
    if (this.props.hideLogo === false) {
      this.setState({ toggle: !this.state.toggle });
    }
  };
  // skicka in props från windows resize

  render() {
    // const toggle = this.state.toggle;
    return (
      <div className="headerContainer">
        <div className="hamburgerMenu" onClick={this.props.toggleSidebar}>
          {this.errorTest()}
        </div>
        {/* <Profile /> */}
        <Spring
          config={config.molasses}
          from={{ opacity: 0, width: "20px" }}
          to={{ opacity: this.state.toggle ? 1 : 0, width: "250px" }}
        >
          {props => <img src={logo} style={props} alt={"site title"} />}
        </Spring>
        <SearchBar
          toggleLogo={this.myCallback}
          value=""
        />
      </div>
    );
  }
}

export default Header;
