import {FC} from "react";
import {Button, Modal} from "antd";
import useModal from "../../../../hooks/modal-hook";
import type {ISize} from "../../../../types/ISize";
import SizeForm from "../../../../components/forms/SizeForm";

interface SizeEditButtonProps {
  onEdit: () => void;
  size: ISize;
}

const SizeEditButton: FC<SizeEditButtonProps> = ({size, onEdit}) => {
  const {isActive, closeModal, openModal} = useModal();

  const handleSubmit = () => {
    onEdit();
    closeModal();
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
          <SizeForm formType={"edit"} onSubmit={handleSubmit} onCancel={closeModal} size={size} />
        </div>
      </Modal>
    </>
  )
};

export default SizeEditButton;