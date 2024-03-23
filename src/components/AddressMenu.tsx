import {useEffect, useState} from "react";
import {Button, Menu, MenuProps, Modal, Tag} from "antd";
import {AxiosResponse} from "axios";
import {IAddress} from "../types/IAddress";
import useModal from "../hooks/modal-hook";
import AddressForm from "./forms/AddressForm";
import {getAddresses} from "../api/requests/address-requests";

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const AddressMenu= () => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [activeAddress, setActiveAddress] = useState<IAddress | null>(null);
  const {isActive, openModal, closeModal} = useModal();

  const getUserAddresses = async () => {
    try {
      const {data: addresses}: AxiosResponse<IAddress[]> = await getAddresses();
      setAddresses(addresses);
    } catch (e) {}
  }

  useEffect(() => {
    getUserAddresses();
  }, []);

  const addressItems: MenuItem[] = [
      ...addresses.map(address => getItem((
          <div
              onClick={() => {
                  openModal();
                  setActiveAddress(address)
              }}
          >
              {address.street_address} / {address.zip_code}   {address.is_default_address && <Tag style={{backgroundColor: "transparent", color: "gray"}}>main</Tag>}
          </div>
      ), address.id, null)),
      getItem(<Button style={{width: "100%"}} onClick={openModal}>Add</Button>, "add-address"),
  ];

  const menuItems: MenuItem[] = [
      getItem( "Addresses", "Addresses", null, addressItems),
  ];

  return (
      <>
          <Menu
              mode={"vertical"}
              items={menuItems}
              theme={"dark"}
              selectable={false}
          />
          <Modal
              centered
              open={isActive}
              onCancel={closeModal}
              footer={null}
              destroyOnClose={true}
          >
              <AddressForm
                  onCancel={() => {
                      closeModal();
                      setActiveAddress(null);
                  }}
                  address={activeAddress}
              />
          </Modal>
      </>
  );
};

export default AddressMenu;