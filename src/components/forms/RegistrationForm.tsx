"use client";
import {ChangeEvent, useState} from "react";
import { useRouter } from 'next/navigation'
import {Button, Form, Input, Layout, message} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import api from "../../api/index";
import {ApiConstants} from "../../api/api-constants";
import {LocalStorageConstants} from "../../constants/localstorage-constants";
import type {AuthResponse} from "../../types/response/auth-response";
import type {NamePath} from "rc-field-form/es/interface";
import {registerAccount} from "../../api/requests/auth-requests";

type FieldType = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
};

const {Item} = Form;
const {Password} = Input;

export const RegistrationForm = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<FieldType>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData(prevState => ({...prevState, [event.target.name]: event.target.value}));
    };

    const handleButtonSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await createAccount({first_name: data.first_name, last_name: data.last_name, email: data.email, password: data.password});
            messageApi.open({
                type: "success",
                content: "Verify your email",
                duration: 5
            });
            setTimeout(() => {
                router.push("/");
            }, 3);
        } catch (e) {
            messageApi.open({
                type: "error",
                content: e.message,
                duration: 5
            });
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const createAccount = async (userData: Omit<FieldType, "confirm_password">) => {
        const {data} = await registerAccount(userData);
        localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, data.access_token);
        console.log(data)
    };

    return (
        <Layout style={{height: "100vh", position: "relative"}}>
            {contextHolder}
            {isLoading && <LoadingOutlined spin style={{fontSize: "50px", position: "absolute", top: "50%", left: "50%"}} />}
            <Content style={{padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <h1 className="mx-auto mb-6 text-2xl font-bold">Registration</h1>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: "70%" }}
                    autoComplete="off"
                    initialValues={{ remember: true }}
                >
                    <Item<FieldType>
                        label="First Name"
                        name="first_name"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input value={data.first_name} onChange={handleInputChange} name="first_name" />
                    </Item>

                    <Item<FieldType>
                        label="Last Name"
                        name="last_name"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input value={data.last_name} onChange={handleInputChange} name="last_name" />
                    </Item>

                    <Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!'
                            },
                            {
                                type: "email",
                                message: "Input correct email"
                            }
                        ]}
                    >
                        <Input value={data.email} onChange={handleInputChange} name="email" />
                    </Item>

                    <Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 4, message: "Password should be at least 4 character" },
                        ]}
                    >
                        <Password value={data.password} onChange={handleInputChange} name="password" />
                    </Item>

                    <Item<FieldType>
                        label="Confirm Password"
                        name="confirm_password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password" as NamePath) === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Password value={data.confirm_password} onChange={handleInputChange} name="confirm_password" />
                    </Item>

                    <Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={handleButtonSubmit}>
                            Submit
                        </Button>
                    </Item>
                </Form>
            </Content>
        </Layout>
    )
};

export default RegistrationForm;