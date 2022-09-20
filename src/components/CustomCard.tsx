import Card from "react-bootstrap/Card";
import styles from "../styles/components/customCard.module.css";
import { CardType } from "../types/types";

const CustomCard = (props: CardType) => {
  return (
    <Card className={styles.cardContainer}>
      <Card.Img
        // className={styles.cardImage}
        variant={"top"}
        src={props.image}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>{props.artist}</Card.Title>
        <Card.Text>
          {props.title} ({props.year})
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
