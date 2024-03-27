import {Button, Card, message, Popconfirm} from "antd";
import type {IColor} from "../../../../types/IColor";
import {FC} from "react";
import {deleteColor} from "../../../../api/requests/color-request";
import ColorEditButton from "./ColorEditButton";

interface ColorsListItemProps {
  color: IColor;
  onChange: () => void;
}

const ColorsListItem: FC<ColorsListItemProps> = ({color, onChange}) => {
  const [messageApi] = message.useMessage();

  const handleColorDelete = async () => {
    try {
      await deleteColor(color.id);
      onChange();
      messageApi.success("Success");
    } catch (e) {
      messageApi.error("Something went wrong");
    }
  }

  return (
    <Card style={{textAlign: "center"}}>
      <div className="font-semibold mb-4 uppercase">{color.name}</div>
      <div className="flex gap-4 items-center">
        <ColorEditButton onEdit={onChange} color={color} />
        <Popconfirm
          title="Delete the color"
          description="Are you sure to delete this color?"
          onConfirm={handleColorDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </div>
    </Card>
  )
};

export default ColorsListItem;