import {Button, Modal} from "antd";
import ColorForm from "../../../../components/forms/ColorForm";
import useModal from "../../../../hooks/modal-hook";
import {FC} from "react";

interface ColorAddButton {
  onAdd: () => void;
}

const ColorAddButton: FC<ColorAddButton> = ({onAdd}) => {
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
          <ColorForm formType={"add"} onSubmit={handleSubmit} onCancel={closeModal} />
        </div>
      </Modal>
    </>
  )
};

export default ColorAddButton;