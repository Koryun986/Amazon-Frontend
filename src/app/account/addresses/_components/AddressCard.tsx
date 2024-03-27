"use client"

import {FC} from "react";
import {Button, Card, Descriptions, Popconfirm, Space, Tag} from "antd";
import EditAddressButton from "./EditAddressButton";
import type {IAddress} from "../../../../types/IAddress";
import {deleteAddress} from "../../../../api/requests/address-requests";

interface AddressCardProps {
  address: IAddress;
  onChange: () => void;
}

const AddressCard: FC<AddressCardProps> = ({address, onChange}) => {
  const handleAddressDelete = async () => {
    try {
      await deleteAddress(address?.id!);
      onChange();
    } catch (e) {

    }
  }

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <Descriptions layout={"vertical"}>
            <Descriptions.Item label={"Country"}>{address.country}</Descriptions.Item>
            <Descriptions.Item label={"State"}>{address.state}</Descriptions.Item>
            <Descriptions.Item label={"City"}>{address.city}</Descriptions.Item>
            <Descriptions.Item label={"Street Address"}>{address.street_address}</Descriptions.Item>
            <Descriptions.Item label={"Zip Code"}>{address.zip_code}</Descriptions.Item>
          </Descriptions>
          {address.is_default_address && (<Tag color={"geekblue"}>Main Address</Tag>)}
        </div>
        <Space direction={"vertical"}>
          <EditAddressButton address={address} onChange={onChange} />
          <Popconfirm
            title="Delete address"
            description="Are you sure to delete this address?"
            onConfirm={handleAddressDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      </div>
    </Card>
  )
};

export default AddressCard;