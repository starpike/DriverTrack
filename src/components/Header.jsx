import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="flex p-4 bg-gray-300">
      <Link to="/" aria-label="Home">
        <img src={logo} alt="Logo" className="w-64"></img>
      </Link>
    </header>
  );
};

export default Header;
