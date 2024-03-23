"use client"
import {Pagination, PaginationProps} from "antd";
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import useFilterByParams from "../hooks/filter-by-params-hook";

const ProductsPagination = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [page, setPage] = useState(+params.get("page") || 1);
  useFilterByParams(page, "page");

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  }

  return (
    <Pagination current={page} onChange={handlePageChange} style={{marginTop: "20px",textAlign: "center"}} total={(page+1) * 8}/>
  )
};

export default ProductsPagination;