import { useState, useEffect } from "react";
import { Catalogue } from "../types/types";
import axios, { AxiosResponse } from "axios";
import { Spinner } from "react-bootstrap";
import CustomCard from "../components/CustomCard";

import styles from "../styles/pages/home.module.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [catalogue, setCatalogue] = useState<Catalogue>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<Catalogue>(
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json"
      )
      .then((res: AxiosResponse<Catalogue>) => {
        console.log(res.data);
        setIsLoading(false);
        setCatalogue(res.data);
      });
  }, []);

  return (
    <div className={styles.pagesContainer}>
      {isLoading ? (
        <Spinner animation={"grow"} variant={"dark"} />
      ) : (
        catalogue?.videos.map((el) => {
          return (
            <CustomCard
              key={el.id}
              image={el.image_url}
              artist={el.artist}
              title={el.title}
            />
          );
        })
      )}
    </div>
  );
};

export default Home;
