"use client"

import {message} from "antd";

export default function AntdMessageProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [_, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      {children}
    </>
  )
}