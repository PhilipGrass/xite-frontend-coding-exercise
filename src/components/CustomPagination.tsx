import { useEffect, useState } from "react";

import Pagination from "react-bootstrap/Pagination";
import { PaginationType } from "../types/types";

const CustomPagination = (props: PaginationType) => {
  const paginationItems = [];
  const isMobile = window.innerWidth < 768;

  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setTotalPages(
      Math.ceil(props.total ? props.total / props.itemsPerPage : 0)
    );
  }, [props]);

  const createPaginationItem = (item: number) => {
    return (
      <Pagination.Item
        active={item === props.currentPage}
        onClick={() => props.onChangePage(item)}
      >
        {item}
      </Pagination.Item>
    );
  };

  if (totalPages < 5) {
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(createPaginationItem(i));
    }
  } else {
    if (props.currentPage >= 1 && props.currentPage <= 3) {
      for (let i = 1; i <= 3; i++) {
        paginationItems.push(createPaginationItem(i));
      }
      paginationItems.push(<Pagination.Ellipsis />);
      paginationItems.push(createPaginationItem(totalPages));
    }

    if (props.currentPage > 3 && props.currentPage < totalPages - 1) {
      paginationItems.push(createPaginationItem(1));
      if (props.currentPage) paginationItems.push(<Pagination.Ellipsis />);
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
        paginationItems.push(createPaginationItem(i));
      }
      paginationItems.push(<Pagination.Ellipsis />);
      paginationItems.push(createPaginationItem(totalPages));
    }

    if (
      props.currentPage >= totalPages - 1 &&
      props.currentPage <= totalPages
    ) {
      paginationItems.push(createPaginationItem(1));
      paginationItems.push(<Pagination.Ellipsis />);
      for (let i = totalPages - 2; i <= totalPages; i++) {
        paginationItems.push(createPaginationItem(i));
      }
    }
  }

  return totalPages === 0 ? null : (
    <Pagination size={isMobile ? "sm" : undefined}>
      <Pagination.First
        onClick={() => {
          props.onChangePage(1);
        }}
      />
      <Pagination.Prev
        onClick={() => {
          props.onChangePage(props.currentPage - 1);
        }}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => {
          props.onChangePage(props.currentPage + 1);
        }}
      />
      <Pagination.Last
        onClick={() => {
          props.onChangePage(totalPages);
        }}
      />
    </Pagination>
  );
};

export default CustomPagination;
