"use client"
import {Pagination, PaginationProps} from "antd";
import {useSearchParams} from "next/navigation";
import {FC, useState} from "react";
import useFilterByParams from "../hooks/filter-by-params-hook";

interface ProductsPaginationProps {
  count: number;
}

const ProductsPagination: FC<ProductsPaginationProps> = ({count}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [page, setPage] = useState(+params.get("page") || 1);
  useFilterByParams(page, "page");

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  }

  return (
    <Pagination current={page} onChange={handlePageChange} style={{marginTop: "20px",textAlign: "center"}} total={count / 8 + 1}/>
  )
};

export default ProductsPagination;