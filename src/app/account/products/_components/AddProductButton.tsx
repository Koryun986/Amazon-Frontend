import {Button, Modal} from "antd";
import useModal from "../../../../hooks/modal-hook";
import ProductForm from "../../../../components/forms/ProductForm";
import {FC} from "react";

interface AddProductButtonProps {
  onAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductButton: FC<AddProductButtonProps> = ({onAdd}) => {
  const {openModal, closeModal, isActive} = useModal();

  const onCancel = () => {
    onAdd(prevState => !prevState);
    closeModal();
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
          <ProductForm onCancel={onCancel} />
        </div>
      </Modal>
    </>
  )
};

export default AddProductButton;