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
import {loginAccount} from "../../api/requests/auth-requests";

type FieldType = {
    email: string;
    password: string;
};

const {Item} = Form;
const {Password} = Input;

const LoginForm = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleButtonSubmit = async (value: any) => {
        try {
            debugger
            setIsLoading(true);
            await loginToAccount(value);
            router.push("/");
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

    const loginToAccount = async (userData: FieldType) => {
        const {data} = await loginAccount(userData);
        localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, data.access_token);
        console.log(data)
    };

    return (
        <Layout style={{height: "100vh", position: "relative"}}>
            {contextHolder}
            <Content style={{padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <h1 className="mx-auto mb-6 text-2xl font-bold">Login</h1>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: "70%" }}
                    autoComplete="off"
                    onFinish={handleButtonSubmit}
                    initialValues={{ remember: true }}
                >
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
                        <Input  />
                    </Item>

                    <Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 4, message: "Password should be at least 4 character" },
                        ]}
                    >
                        <Password />
                    </Item>

                    <Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Submit
                        </Button>
                    </Item>
                </Form>
            </Content>
        </Layout>
    )
};

export default LoginForm;