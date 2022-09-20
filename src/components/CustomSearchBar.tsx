import { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "../styles/components/customSearchBar.module.css";

type OnSearch = {
  onSearch: (searchedValue: string) => void;
};

const CustomSearchBar = (props: OnSearch) => {
  const [search, setSearch] = useState<string>("");

  const onInputChange = (value: string) => {
    setSearch(value);
    props.onSearch(value);
  };

  return (
    <Form className={styles.searchBar}>
      <Form.Control
        type={"text"}
        placeholder={"Search"}
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </Form>
  );
};

export default CustomSearchBar;
