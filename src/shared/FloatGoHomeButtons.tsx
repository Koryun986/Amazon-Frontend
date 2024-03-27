"use client"
import {useRouter} from "next/navigation";
import {FloatButton} from "antd";
import {HomeOutlined} from "@ant-design/icons";

const FloatGoHomeButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  }
  return (
    <FloatButton shape={"circle"} icon={<HomeOutlined />} onClick={handleGoBack} />
  )
};

export default FloatGoHomeButton;