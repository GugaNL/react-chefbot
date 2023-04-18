import logo from "../../../assets/chef.png";
import I18n from "../../atoms/I18n";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar shadow rounded-bottom fixed-top navbar-chef">
      <div className="container-fluid">
        <a className="navbar-brand mx-auto" href="#">
          <img src={logo} alt="logo" width={50} height={54} />
          <b className="text-white">ChefBot</b>
        </a>
          <I18n />
      </div>
    </nav>
  );
};

export default Navbar;
