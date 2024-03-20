"use client"
import {FC} from "react";
import {Avatar, Space} from "antd";
import HeaderMenu from "./HeaderMenu";
import type {IUser} from "../../../types/IUser";
import {AccountPageList} from "./AccountPage";

interface AccountHeaderProps {
    user: IUser,
    menuItem: AccountPageList,
    setMenuItem: (item: AccountPageList) => void;
}

const AccountHeader: FC<AccountHeaderProps> = ({user, menuItem, setMenuItem}) => {
    return (
        <div className="py-8 flex items-center justify-between">
            <Space direction={"horizontal"}>
                <Avatar size={40} style={{backgroundColor: "#001529", fontSize: "16px"}}>{user.first_name[0]} {user.last_name[0]}</Avatar>
                <div>{user.email}</div>
            </Space>
            <HeaderMenu current={menuItem} setCurrent={setMenuItem} />
        </div>
    )
};

export default AccountHeader;