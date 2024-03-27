"use client"

import {useEffect, useState} from "react";;
import {Empty, Space} from "antd";
import {getColors} from "../../../../api/requests/color-request";
import type {IColor} from "../../../../types/IColor";
import ColorsListItem from "./ColorsListItem";
import ColorAddButton from "./ColorAddButton";

const ColorsList = () => {
  const [colors, setColors] = useState<IColor[]>([]);
  const [colorsChangeTrigger, setColorsChangeTrigger] = useState(false);

  const fetchColors = async () => {
    try {
      const {data: colors} = await getColors();
      setColors(colors);
    } catch (e) {}
  }

  useEffect(() => {
    fetchColors();
  }, [colorsChangeTrigger]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold mb-4">Colors</div>
        <ColorAddButton onAdd={() => setColorsChangeTrigger(prevState => !prevState)} />
      </div>
      {colors.length ? (
        <Space direction={"horizontal"}>
          {colors.map(color => <ColorsListItem color={color} key={color.id} onChange={() => setColorsChangeTrigger(prevState => !prevState)} />)}
        </Space>
      ) : (<Empty />)}
    </>
  )
};

export default ColorsList;