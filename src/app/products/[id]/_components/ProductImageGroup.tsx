"use client"

import {Image} from "antd";
import {ApiConstants} from "../../../../api/api-constants";
import {FC} from "react";

const {PreviewGroup} = Image;

interface ProductImageGroupProps {
  main_image: string;
  images: {
    image_url: string
  }[];
}

const ProductImageGroup: FC<ProductImageGroupProps> = ({main_image, images}) => {
  return (
    <PreviewGroup>
      <div className="col-start-1 col-span-2 row-start-1 row-span-2">
        <Image width={"100%"} height={"100%"} src={ApiConstants.PUBLIC_ASSETS_URL+main_image} alt={"Product Image"} className={"object-contain"} />
      </div>
      {!!images.length && images.map((image, index) => (
        <div className="h-full row-span-1" key={index}><Image width={"100%"} height={"100%"} className="mx-auto object-contain" src={ApiConstants.PUBLIC_ASSETS_URL+image.image_url} /></div>
      ))}
    </PreviewGroup>
  )
};

export default ProductImageGroup;