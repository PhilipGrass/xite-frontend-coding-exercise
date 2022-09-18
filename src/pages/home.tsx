import { useState, useEffect, useMemo } from "react";
import { Catalogue } from "../types/types";
import axios, { AxiosResponse } from "axios";
import CustomSpinner from "../components/CustomSpinner";
import CustomCard from "../components/CustomCard";
import CustomPagination from "../components/CustomPagination";

import styles from "../styles/pages/home.module.css";
import CustomNavbar from "../components/CustomNavbar";

const ITEMS_PER_PAGE = 20;

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [catalogue, setCatalogue] = useState<Catalogue>();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get<Catalogue>(
          "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json"
        )
        .then((res: AxiosResponse<Catalogue>) => {
          console.log(res.data);
          setIsLoading(false);
          setCatalogue(res.data);
        })
        .catch(() => alert("Error in fetching the catalogue"));
    }, 2000);
  }, []);

  const slicedCatalogue = useMemo(() => {
    return catalogue?.videos.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [catalogue, currentPage]);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <div className={styles.homeContainer}>
      <CustomNavbar />
      <div className={styles.catalogue}>
        {slicedCatalogue?.map((el) => {
          return (
            <CustomCard
              key={el.id}
              image={el.image_url}
              artist={el.artist}
              title={el.title}
            />
          );
        })}
      </div>
      <CustomPagination
        total={catalogue?.videos.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Home;
