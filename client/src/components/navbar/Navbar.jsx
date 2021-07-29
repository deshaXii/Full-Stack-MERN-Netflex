import {useState} from "react";
import "./navbar.scss";
import { Search as SearchI, Notifications, ArrowDropDown } from "@material-ui/icons";
import {NavLink} from 'react-router-dom'
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }
  return (
    <div className={`navbar ${isScrolled ? `scrolled` : ''}`}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
           <span> <NavLink exact to="/"> Homepage </NavLink> </span>
           <span> <NavLink to="/series"> Series </NavLink> </span> 
           <span> <NavLink to="/movies"> Movies </NavLink> </span> 
          <span>New and Populer</span>
          <span>My List</span>
        </div>

        <div className="right">
          <SearchI className="icon" />
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
