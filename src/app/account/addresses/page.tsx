"use client"

import {useUser} from "../../../hooks/user-hook";
import {useEffect, useState} from "react";
import {IAddress} from "../../../types/IAddress";
import UnAuthorizedPage from "../../../shared/UnAuthorizedPage";
import {getAddresses} from "../../../api/requests/address-requests";
import AddProductButton from "../products/_components/AddProductButton";
import AddAddressButton from "./_components/AddAddressButton";
import AddressCard from "./_components/AddressCard";
import {Empty, Space, Spin} from "antd";
import {is} from "immer/src/utils/common";

const AddressPage = () => {
  const [addresses, setAddresses] = useState<IAddress[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [addressChangeTrigger, setAddressChangeTrigger] = useState(false);
  const user = useUser();

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const {data} = await getAddresses();
      setAddresses(data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, [user, addressChangeTrigger]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size={"large"}/>
      </div>
    )
  }

  if (!user) {
    return (<UnAuthorizedPage />)
  }

  return (
    <div className="container mx-auto pt-10">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold mb-4">Your Addresses</div>
        <AddAddressButton onAdd={() => setAddressChangeTrigger(prevState => !prevState)} />
      </div>
      <Space direction={"vertical"}>
        {addresses?.length && (
          addresses.map(address => <AddressCard key={address.id} address={address} onChange={() => setAddressChangeTrigger(prevState => !prevState)} />)
        )}
        {!addresses?.length && <Empty />}
      </Space>
    </div>
  )
};

export default AddressPage;