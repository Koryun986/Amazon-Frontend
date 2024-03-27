import {FC} from "react";
import {Button, Card, message, Popconfirm} from "antd";
import SizeEditButton from "./SizeEditButton";
import {deleteSize} from "../../../../api/requests/size-requests";
import type {ISize} from "../../../../types/ISize";

interface SizesListItemProps {
  size: ISize;
  onChange: () => void;
}

const SizeListItem: FC<SizesListItemProps> = ({size, onChange}) => {
  const handleSizeDelete = async () => {
    try {
      await deleteSize(size.id);
      onChange();
      message.success("Success");
    } catch (e) {
      message.error("Something went wrong");
    }
  }

  return (
    <Card style={{textAlign: "center"}}>
      <div className="font-semibold mb-4 uppercase">{size.name}</div>
      <div className="flex gap-4 items-center">
        <SizeEditButton onEdit={onChange} size={size} />
        <Popconfirm
          title="Delete the size"
          description="Are you sure to delete this size?"
          onConfirm={handleSizeDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </div>
    </Card>
  )
};

export default SizeListItem;