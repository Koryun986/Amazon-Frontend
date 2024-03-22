import {Empty} from "antd";
import {getAllProducts} from "../api/requests/product-requests";
import ProductsSkeleton from "../components/ProductsSkeleton";
import dynamic from "next/dynamic";

const Products = dynamic<any, any>(() => import("../components/Products"), {
  loading: () => <ProductsSkeleton />
});

export default async function Home({searchParams}) {
  const params = new URLSearchParams(searchParams);
  const {data} = await getAllProducts(params.toString());

  return (
    <>
      {data.length ? (
          <Products products={data} />
      ) : (<Empty />)}
    </>
  );
}
