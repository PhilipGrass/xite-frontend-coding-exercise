import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/components/customNavbar.module.css";

const CustomNavbar = () => {
  return (
    <Navbar className={styles.navbarContainer} bg={"light"} expand={"lg"}>
      <Navbar.Brand className={styles.imageContainer} href={"/"}>
        <img
          className={styles.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/9/92/Logo_XITE_2017_zwart.png"
          alt="XITE Logo"
        />
      </Navbar.Brand>
      <div className={styles.text}>Frontend Coding Exercise Platform</div>
    </Navbar>
  );
};

export default CustomNavbar;
