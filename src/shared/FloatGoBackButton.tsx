"use client"
import {useRouter} from "next/navigation";
import {FloatButton} from "antd";
import {LeftOutlined} from "@ant-design/icons";

const FloatGoBackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  }
  return (
    <FloatButton shape={"circle"} icon={<LeftOutlined />} onClick={handleGoBack} />
  )
};

export default FloatGoBackButton;