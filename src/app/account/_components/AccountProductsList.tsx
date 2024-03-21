"use client"
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/store-hooks";
import {fetchAccountProducts} from "../../../redux/slices/products-slice";
import {Empty, Modal, Space} from "antd";
import AccountProductItem from "./AccountProductItem";
import useModal from "../../../hooks/modal-hook";
import {IProduct} from "../../../types/IProduct";

const AccountProductsList = () => {
    const [editableProduct, setEditableProduct] = useState<IProduct | null>(null);
    const dispatch = useAppDispatch();
    const {products} = useAppSelector(state => state.products);
    const {isActive, openModal, closeModal} = useModal();

    const onEdit = (product: IProduct) => {
        setEditableProduct(product);
        openModal();
    }

    useEffect(() => {
        dispatch(fetchAccountProducts());
    }, []);

    return (
        <div>
            <div className="text-2xl font-bold mb-4">Your Products</div>
            <Space
                style={{width: "100%"}}
                direction={"vertical"}
            >
                {products.length ? products.map(product => (<AccountProductItem product={product} key={product.id} onEdit={onEdit} />)) : <Empty />}
            </Space>
            <Modal
                centered
                open={isActive}
                onCancel={closeModal}
                footer={null}
                destroyOnClose={true}
            >
            </Modal>
        </div>
    )
};

export default AccountProductsList;