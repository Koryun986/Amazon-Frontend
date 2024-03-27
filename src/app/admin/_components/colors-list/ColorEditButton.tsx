import {Button, Modal} from "antd";
import ColorForm from "../../../../components/forms/ColorForm";
import useModal from "../../../../hooks/modal-hook";
import {FC} from "react";
import {IColor} from "../../../../types/IColor";

interface ColorEditButtonProps {
  onEdit: () => void;
  color: IColor;
}

const ColorEditButton: FC<ColorEditButtonProps> = ({color, onEdit}) => {
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
          <ColorForm formType={"edit"} onSubmit={handleSubmit} onCancel={closeModal} color={color} />
        </div>
      </Modal>
    </>
  )
};

export default ColorEditButton;