import CategoryForm from "../../../../components/forms/CategoryForm";
import {Button, Modal} from "antd";
import useModal from "../../../../hooks/modal-hook";
import {FC} from "react";
import {ICategory} from "../../../../types/ICategory";

interface CategoryAddButtonProps {
  onChange: () => void;
  categories: ICategory[];
}

const CategoryAddButton: FC<CategoryAddButtonProps> = ({onChange, categories}) => {
  const {isActive, closeModal, openModal} = useModal();

  const handleSubmit = () => {
    closeModal();
    onChange();
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
          <CategoryForm categories={categories} formType={"add"} onSubmit={handleSubmit} onCancel={closeModal} />
        </div>
      </Modal>
    </>
  )
};

export default CategoryAddButton;