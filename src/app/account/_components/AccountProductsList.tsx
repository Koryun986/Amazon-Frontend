"use client"
import {useEffect, useState} from "react";
import {Empty, Modal, Space} from "antd";
import AccountProductItem from "./AccountProductItem";
import useModal from "../../../hooks/modal-hook";
import {getAccountProducts} from "../../../api/requests/product-requests";
import type {IProduct} from "../../../types/IProduct";

const AccountProductsList = () => {
    const [editableProduct, setEditableProduct] = useState<IProduct | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const {isActive, openModal, closeModal} = useModal();

    const onEdit = (product: IProduct) => {
        setEditableProduct(product);
        openModal();
    };

    const fetchProducts = async () => {
      try {
        const products = await getAccountProducts()
        setProducts(products);
      } catch (e) {}
    }

    useEffect(() => {
      fetchProducts();
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