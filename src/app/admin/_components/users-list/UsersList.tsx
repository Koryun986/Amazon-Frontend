"use client"

import {useEffect, useState} from "react";
import type {IUser} from "../../../../types/IUser";
import {getAllUsers} from "../../../../api/requests/auth-requests";
import {Empty, Space} from "antd";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersChangeTrigger, setUsersChangeTrigger] = useState(false);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users);
    } catch (e) {}
  }

  useEffect(() => {
    fetchUsers();
  }, [usersChangeTrigger]);

  return (
    <div>
      <div className="text-lg font-bold">Users</div>
        {users.length ? (
          <Space style={{width: "100%"}} direction={"vertical"}>
            {users.map(user => <UsersListItem key={user.email} user={user} onChange={() => setUsersChangeTrigger(prevState => !prevState)} />)}
          </Space>
        ) : (<Empty />)}
    </div>
  )
};

export default UsersList;