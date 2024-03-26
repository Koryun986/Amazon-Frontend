"use client"
import {FC} from "react";
import {Button, Modal} from "antd";
import useModal from "../../../../hooks/modal-hook";
import EditProductForm from "../../../../components/forms/EditProductForm";
import type {IProduct} from "../../../../types/IProduct";

interface EditProductButtonProps {
  onEdit: () => void;
  product: IProduct;
}

const EditProductButton: FC<EditProductButtonProps> = ({onEdit, product}) => {
  const {openModal, closeModal, isActive} = useModal();

  const handleEditButtonClick = () => {
    openModal();
  }

  return (
    <>
      <Button onClick={handleEditButtonClick}>Edit</Button>
      <Modal
        centered
        open={isActive}
        onCancel={closeModal}
        footer={null}
        destroyOnClose={true}
      >
        <div className={"p-4"}>
          <EditProductForm onCancel={closeModal} onSubmit={onEdit} product={product} />
        </div>
      </Modal>
    </>
  )
};

export default EditProductButton;