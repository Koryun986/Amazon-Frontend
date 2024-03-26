"use client"

import {Button, Modal} from "antd";
import AddressForm from "../../../../components/forms/AddressForm";
import {FC} from "react";
import useModal from "../../../../hooks/modal-hook";
import type {IAddress} from "../../../../types/IAddress";

interface EditAddressButtonProps {
  address: IAddress;
  onChange: () => void;
}

const EditAddressButton: FC<EditAddressButtonProps> = ({address, onChange}) => {
  const {isActive, closeModal, openModal} = useModal();

  const handleAddressEdit = () => {
    closeModal();
    onChange();
  }

  return (
    <>
      <Button onClick={openModal}>Edit</Button>
      <Modal
        centered
        open={isActive}
        onCancel={closeModal}
        footer={null}
        destroyOnClose={true}
      >
        <div className={"p-4"}>
          <AddressForm address={address} onCancel={closeModal} formType={"edit"} onSubmit={handleAddressEdit} />
        </div>
      </Modal>
    </>
  )
};

export default EditAddressButton;