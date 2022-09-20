import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/components/customSpinner.module.css";

const CustomSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner className={styles.spinner} animation={"grow"} />
    </div>
  );
};

export default CustomSpinner;
