"use client"
import {FC} from "react";
import {Button, Flex, Form, Input, Popconfirm, Space, Switch} from "antd";
import {createAddress, deleteAddress, updateAddress} from "../../api/requests/address-requests";
import type {IAddress} from "../../types/IAddress";

interface AddressFormProps {
    address: IAddress;
    onCancel: () => void;
    formType: "add" | "edit";
    onSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultAddressValue = {
    country: "",
    state: "",
    city: "",
    zip_code: "",
    street_address: "",
    is_default_address: false,
};

const AddressForm: FC<AddressFormProps> = ({address = defaultAddressValue, onCancel, formType, onSubmit}) => {
    const [form] = Form.useForm();

    const handleSubmitButtonClick = async (data: Omit<IAddress, "id">) => {
        console.log("address data",data)
        try {
            if (formType === "edit")  {
                await updateAddress({...data, id: address.id});
            } else {
                await createAddress(data);
            }
            onSubmit(prevState => !prevState);
        } catch (e) {
            console.log(e)
        } finally {
            onCancel();
        }
    };
    
    const handleDeleteAddress = async () => {
        try {
            await deleteAddress(address?.id!);
            onSubmit(prevState => !prevState);
        } catch (e) {
            console.log(e)
        } finally {
            onCancel();
        }
    }

    return (
        <Form
            form={form}
            name="UserForm"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 20,
            }}
            style={{
                maxWidth: 600,
            }}
            autoComplete="off"
            onFinish={handleSubmitButtonClick}
        >
            <Form.Item
                label="Country"
                name="country"
                initialValue={address.country}
                rules={[
                    {
                        required: true,
                        message: 'Please input country name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="State"
                name="state"
                initialValue={address.state}
                rules={[
                    {
                        required: true,
                        message: 'Please input state name!',
                    },
                ]}

            >
                <Input />
            </Form.Item>

            <Form.Item
                label="City"
                name="city"
                initialValue={address.city}
                rules={[
                    {
                        required: true,
                        message: 'Please input city name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Zip Code"
                name="zip_code"
                initialValue={address.zip_code}
                rules={[
                    {
                        required: true,
                        message: 'Please input zip code!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Street Address"
                name="street_address"
                initialValue={address.street_address}
                labelCol={10}
                rules={[
                    {
                        required: true,
                        message: 'Please input street address!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Is Main Address"
                name="is_default_address"
                initialValue={false}
                labelCol={10}
            >
                <Switch />
            </Form.Item>

            <Flex justify={"space-between"}>
                <Space>
                    <Button htmlType="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        {formType === "edit" ? "Edit" : "Add"}
                    </Button>
                </Space>
                {formType === "edit" && (
                    <Popconfirm
                        title="Delete the address"
                        description="Are you sure to delete this address?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={handleDeleteAddress}
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                )}
            </Flex>
        </Form>
    );
};

export default AddressForm;