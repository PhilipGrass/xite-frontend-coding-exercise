import { useState, useEffect } from "react";
import { Genre, Video } from "../types/types";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/components/customSelectBar.module.css";

type OnSelectedType =
  | ((selected: Genre) => void)
  | ((selected: number) => void);

type CustomSelectBarType = {
  data: Array<Genre | Video>;
  onSelected: OnSelectedType;
};

const CustomSelectBar = ({ data, onSelected }: CustomSelectBarType) => {
  const [genre, setGenre] = useState<Array<Genre>>();
  const [year, setYear] = useState<Array<number>>();
  const [optionSelected, setOptionSelected] = useState<string | number>();

  const isGenre = (value: Array<Genre | Video>): value is Array<Genre> => {
    return (value as Array<Genre>)[0].name !== undefined;
  };

  const filteredYears = () => {
    if (!isGenre(data)) {
      return (data as unknown as Array<Video>)
        .map((el) => el.release_year)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();
    }
  };

  useEffect(() => {
    if (isGenre(data)) {
      setGenre(data as unknown as Array<Genre>);
    } else {
      setYear(filteredYears());
    }
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle variant={"dark"}>
        {optionSelected
          ? optionSelected
          : isGenre(data)
          ? "Filter by genre"
          : "Filter by year"}
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.dropdown}>
        {genre?.map((el) => {
          return (
            <Dropdown.Item
              key={el.id}
              as={"button"}
              onClick={() => {
                setOptionSelected(el.name);
                onSelected(el as Extract<OnSelectedType, Genre>);
              }}
            >
              {el.name}
            </Dropdown.Item>
          );
        })}
        {year?.map((el, i) => {
          return (
            <Dropdown.Item
              key={i}
              as={"button"}
              onClick={() => {
                setOptionSelected(el);
                onSelected(el as Extract<OnSelectedType, number>);
              }}
            >
              {el}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomSelectBar;
