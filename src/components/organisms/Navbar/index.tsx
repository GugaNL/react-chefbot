import logo from "../../../assets/chef.png";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar shadow rounded-bottom fixed-top navbar-chef">
      <div className="container-fluid">
        <a className="navbar-brand mx-auto" href="#">
          <img src={logo} alt="logo" width={50} height={54} />
          <b className="text-white">ChefBot</b>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
