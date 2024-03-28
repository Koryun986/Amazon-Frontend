import {FC} from "react";
import {Modal} from "antd";
import useModal from "../../../../hooks/modal-hook";
import type {ICategory} from "../../../../types/ICategory";
import CategoryForm from "../../../../components/forms/CategoryForm";

interface CategoryItemProps {
  category: ICategory;
  categories: ICategory[];
  onChange: () => void;
}

const CategoryItem: FC<CategoryItemProps> = ({category, categories, onChange}) => {
  const {isActive, closeModal, openModal} = useModal();

  const handleSubmit = () => {
    closeModal();
    onChange();
  }

  return (
    <>
      <span onClick={openModal}>{category.name}</span>
      <Modal
        centered
        open={isActive}
        onCancel={closeModal}
        footer={null}
        destroyOnClose={true}
      >
        <div className={"p-4"}>
          <CategoryForm categories={categories} formType={"edit"} onSubmit={handleSubmit} onCancel={closeModal} category={category} />
        </div>
      </Modal>
    </>
  )
};

export default CategoryItem;