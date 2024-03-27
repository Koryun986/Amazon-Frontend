import {FC} from "react";
import {Button, Modal} from "antd";
import useModal from "../../../../hooks/modal-hook";
import SizeForm from "../../../../components/forms/SizeForm";

interface SizeAddButton {
  onAdd: () => void;
}

const SizeAddButton: FC<SizeAddButton> = ({onAdd}) => {
  const {isActive, closeModal, openModal} = useModal();

  const handleSubmit = () => {
    onAdd();
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
          <SizeForm formType={"add"} onSubmit={handleSubmit} onCancel={closeModal} />
        </div>
      </Modal>
    </>
  )
};

export default SizeAddButton;