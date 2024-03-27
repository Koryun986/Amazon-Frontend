"use client"

import {FC} from "react";
import {Menu} from "antd";
import type {MenuProps} from "antd";
import type {AdminMenuPages} from "../page";
import {BgColorsOutlined, UsergroupAddOutlined} from "@ant-design/icons";

interface AdminPageHeaderProps {
  currentItem: AdminMenuPages;
  setCurrentItem: React.Dispatch<React.SetStateAction<AdminMenuPages>>
}

const AdminPageHeader: FC<AdminPageHeaderProps> = ({currentItem, setCurrentItem}) => {
  const items: MenuProps['items'] = [
    {
      label: 'Users',
      key: 'users',
      icon:<UsergroupAddOutlined />
    },
    {
      label: 'Colors',
      key: 'colors',
      icon: <BgColorsOutlined />
    },
    {
      label: 'Sizes',
      key: 'sizes',
    },
    {
      label: 'Categories',
      key: 'categories',
    }
  ];

  return (
    <div className="flex justify-between items-center py-4">
      <div className="text-xl font-bold">Amazon Admin</div>
      <Menu selectedKeys={currentItem} onClick={(e) => setCurrentItem(e.key as AdminMenuPages)} mode={"horizontal"} items={items} />
    </div>
  )
};

export default AdminPageHeader;