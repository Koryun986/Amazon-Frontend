import {Avatar, Button, Card, message, Popconfirm} from "antd";
import type {IUser} from "../../../../types/IUser";
import {FC} from "react";
import {makeUserAdmin} from "../../../../api/requests/auth-requests";

interface UsersListItemProps {
  user: IUser;
  onChange: () => void;
}

const UsersListItem: FC<UsersListItemProps> = ({user, onChange}) => {
  const [messageApi] = message.useMessage();
  const handleMakeUserAdmin = async () => {
    try {
      await makeUserAdmin(user.email);
      onChange();
      messageApi.success("Success");
    } catch (e) {
      messageApi.error("Something went wrong, can't make this users-list admin")
    }
  }

  return (
    <Card>
      <div className="flex gap-4 justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar shape={"circle"}>{user.first_name[0]}{user.last_name[0]}</Avatar>
          <div className="font-semibold">{user.first_name} {user.last_name}</div>
        </div>
        <div>{user.email}</div>
        <Popconfirm
          title="Make user admin"
          description="Are you sure to make this user admin?"
          onConfirm={handleMakeUserAdmin}
          okText="Yes"
          cancelText="No"
        >
          <Button>Make Admin</Button>
        </Popconfirm>
      </div>
    </Card>
  )
};

export default UsersListItem;