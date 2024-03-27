"use client"

import {FC} from "react";
import {Button, Modal} from "antd";
import useModal from "../../../../hooks/modal-hook";
import AddressForm from "../../../../components/forms/AddressForm";

interface AddAddressButtonProps {
  onAdd: () => void;
}

const AddAddressButton: FC<AddAddressButtonProps> = ({onAdd}) => {
  const {openModal, closeModal, isActive} = useModal();

  const handleAddAddress = () => {
    closeModal();
    onAdd();
  }

  return (
    <>
      <Button onClick={openModal}>Add</Button>
      <Modal
        centered
        open={isActive}
        onCancel={closeModal}
        footer={null}
        destroyOnClose={true}
      >
        <div className={"p-4"}>
          <AddressForm address={undefined} onCancel={closeModal} formType={"add"} onSubmit={handleAddAddress} />
        </div>
      </Modal>
    </>
  )
};

export default AddAddressButton;