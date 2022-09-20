import { useState, useEffect, useMemo } from "react";
import { Catalogue, Genre } from "../types/types";
import axios, { AxiosResponse } from "axios";

import CustomSpinner from "../components/CustomSpinner";
import CustomCard from "../components/CustomCard";
import CustomPagination from "../components/CustomPagination";
import CustomNavbar from "../components/CustomNavbar";
import CustomSearchBar from "../components/CustomSearchBar";
import CustomSelectBar from "../components/CustomSelectBar";

import styles from "../styles/pages/home.module.css";

const isMobile = window.innerWidth < 768;

const ITEMS_PER_PAGE = isMobile ? 10 : 20;

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [catalogue, setCatalogue] = useState<Catalogue>();
  const [search, setSearch] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>();
  const [selectedGenre, setSelectedGenre] = useState<Genre>();
  const [selectedYear, setSelectedYear] = useState<number>(0);

  useEffect(() => {
    // Set timeout used for just check if the spinner component works! :)
    // setTimeout(() => {
    axios
      .get<Catalogue>(
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json"
      )
      .then((res: AxiosResponse<Catalogue>) => {
        // console.log(res.data);
        setIsLoading(false);
        setCatalogue(res.data);
      })
      .catch(() => {
        setIsLoading(false);
        alert("Error in fetching the catalogue");
      });
    // }, 2000);
  }, []);

  // "Filtered" is the array we use for either have the entire catalogue
  // or have the results filtered by the search bar or the filters buttons.

  const filtered = useMemo(() => {
    let filteredResult = catalogue?.videos;

    if (search) {
      filteredResult = filteredResult?.filter((result) => {
        return (
          result.artist.toLowerCase().includes(search.toLowerCase()) ||
          result.title.toString().toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    if (selectedGenre) {
      filteredResult = filteredResult?.filter((result) => {
        return result.genre_id === selectedGenre.id;
      });
    }

    if (selectedYear) {
      filteredResult = filteredResult?.filter((result) => {
        return result.release_year === selectedYear;
      });
    }

    setTotalItems(filteredResult ? filteredResult.length : 0);

    return filteredResult?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [catalogue, currentPage, search, selectedGenre, selectedYear]);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    // The homepage is made by the upper navbar, the search bar, two filter
    // buttons, the cards and the pagination bar.

    <div className={styles.homeContainer}>
      <CustomNavbar />
      <CustomSearchBar
        onSearch={(value: string) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />
      <div className={styles.selectContainer}>
        <CustomSelectBar
          data={catalogue ? catalogue.genres : []}
          onSelected={setSelectedGenre}
        />
        <CustomSelectBar
          data={catalogue ? catalogue.videos : []}
          onSelected={setSelectedYear}
        />
      </div>
      <div className={styles.catalogue}>
        {filtered?.length !== 0 ? (
          filtered?.map((el) => {
            return (
              <CustomCard
                key={el.id}
                image={el.image_url}
                artist={el.artist}
                title={el.title}
                year={el.release_year}
              />
            );
          })
        ) : (
          <div className={styles.noItemsFound}>No items found!</div>
        )}
      </div>
      <CustomPagination
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Home;
