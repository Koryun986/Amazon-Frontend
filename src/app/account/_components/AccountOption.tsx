"use client"
import {FC, ReactNode} from "react";
import Link from "next/link";
import {Button} from "antd";

interface AccountOptionProps {
  title: string;
  href: string;
  icon?: ReactNode;
}

const AccountOption: FC<AccountOptionProps> = ({title, icon, href}) => {
  return (
    <Link href={href}>
      <Button size={"large"} style={{height: "100%", display: "flex", alignItems: "center"}}>
        {!!icon && icon} {title}
      </Button>
    </Link>
  )
};

export default AccountOption;