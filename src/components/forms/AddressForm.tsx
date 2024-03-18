"use client"

import {IAddress} from "../../types/IAddress";
import {ChangeEvent, FC, useState} from "react";
import {Button, Form, Input, Space, Switch} from "antd";
import {useAppDispatch} from "../../hooks/store-hooks";
import {updateAddress} from "../../api/requests/address-requests";
import {fetchAddresses} from "../../redux/slices/user-address-slice";

interface AddressFormProps {
    address?: IAddress;
    onCancel: () => void;
}

const AddressForm: FC<AddressFormProps> = ({address, onCancel}) => {
    const [localAddress, setLocalAddress] = useState<Omit<IAddress, "id">>(address ? address : {
        country: "",
        state: "",
        city: "",
        zip_code: "",
        street_address: "",
        is_default_address: false,
    });
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalAddress(prevState => ({...prevState, [event.target.name]: event.target.value}));
    };

    const handleSubmitButtonClick = async () => {
        if (address)  {
            await updateAddress({...localAddress, id: address.id});
            dispatch(fetchAddresses());
        } else {

        }
        onCancel();
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
        >
            <Form.Item
                label="Country"
                name="country"
                initialValue={localAddress.country}
                rules={[
                    {
                        required: true,
                        message: 'Please input country name!',
                    },
                ]}
            >
                <Input name="country" value={localAddress.country} onChange={handleInputChange}/>
            </Form.Item>

            <Form.Item
                label="State"
                name="state"
                initialValue={localAddress.state}
                rules={[
                    {
                        required: true,
                        message: 'Please input state name!',
                    },
                ]}

            >
                <Input name="state" value={localAddress.state} onChange={handleInputChange}/>
            </Form.Item>

            <Form.Item
                label="City"
                name="city"
                initialValue={localAddress.city}
                rules={[
                    {
                        required: true,
                        message: 'Please input city name!',
                    },
                ]}
            >
                <Input name="city" value={localAddress.city} onChange={handleInputChange}/>
            </Form.Item>

            <Form.Item
                label="Zip Code"
                name="zip_code"
                initialValue={localAddress.zip_code}
                rules={[
                    {
                        required: true,
                        message: 'Please input zip code!',
                    },
                ]}
            >
                <Input name="zip_code" value={localAddress.zip_code} onChange={handleInputChange}/>
            </Form.Item>

            <Form.Item
                label="Street Address"
                name="street_address"
                initialValue={localAddress.street_address}
                rules={[
                    {
                        required: true,
                        message: 'Please input street address!',
                    },
                ]}
            >
                <Input name="street_address" value={localAddress.street_address} onChange={handleInputChange}/>
            </Form.Item>

            <Space direction="vertical" className="mb-4">
                <div>Is Main Address</div>
                <Switch defaultValue={localAddress.is_default_address} onChange={(checked => setLocalAddress(prevState => ({...prevState, is_default_address: checked})))} />
            </Space>

            <Form.Item>
                <Space>
                    <Button htmlType="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleSubmitButtonClick}>
                        {address ? "Edit" : "Add"}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default AddressForm;