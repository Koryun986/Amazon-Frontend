"use client"

import {useEffect, useState} from "react";;
import {Empty, Space} from "antd";
import ColorAddButton from "./SizeAddButton";
import {getSizes} from "../../../../api/requests/size-requests";
import type {ISize} from "../../../../types/ISize";
import SizeListItem from "./SizeListItem";

const SizeList = () => {
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [sizesChangeTrigger, setSizesChangeTrigger] = useState(false);

  const fetchSizes = async () => {
    try {
      const {data} = await getSizes();
      setSizes(data);
    } catch (e) {}
  }

  useEffect(() => {
    fetchSizes();
  }, [sizesChangeTrigger]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold mb-4">Sizes</div>
        <ColorAddButton onAdd={() => setSizesChangeTrigger(prevState => !prevState)} />
      </div>
      {sizes.length ? (
        <Space direction={"horizontal"}>
          {sizes.map(size => <SizeListItem size={size} key={size.id} onChange={() => setSizesChangeTrigger(prevState => !prevState)} />)}
        </Space>
      ) : (<Empty />)}
    </>
  )
};

export default SizeList;