"use client"
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useState} from "react";
import {Button, Form, Input, Layout, message} from "antd";
import {Content} from "antd/es/layout/layout";
import {NamePath} from "rc-field-form/es/interface";
import {registerAccount} from "../../../api/requests/auth-requests";
import {LocalStorageConstants} from "../../../constants/localstorage-constants";
import {addManyFavoritesRequest} from "../../../api/requests/favorite-requests";
import {addManyCartItemsRequest} from "../../../api/requests/cart-item-requests";

type FieldType = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
};

const {Item} = Form;
const {Password} = Input;

const RegistrationPage = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleButtonSubmit = async (data: FieldType) => {
        try {
            setIsLoading(true);
            const user = await createAccount(data);
            await messageApi.open({
                type: "success",
                content: `${user.first_name} ${user.last_name} please verify your email`,
                duration: 5
            });
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

    const createAccount = async (userData: Omit<FieldType, "confirm_password">) => {
        const {data} = await registerAccount(userData);
        localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, data.access_token);
        const favorites = localStorage.getItem(LocalStorageConstants.FAVORITES) ? JSON.parse(localStorage.getItem(LocalStorageConstants.FAVORITES)!) : null;
        const cartItems = localStorage.getItem(LocalStorageConstants.CART_ITEMS) ? JSON.parse(localStorage.getItem(LocalStorageConstants.CART_ITEMS)!) : null;
        if (favorites) {
            await addManyFavoritesRequest(favorites);
        }
        if (cartItems) {
            await addManyCartItemsRequest(cartItems);
        }
        return data;
    };

    return (
      <Layout style={{height: "100vh", position: "relative"}}>
          {contextHolder}
          <Content style={{padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center",  width: "50%", marginInline: "auto"}}>
              <h1 className="mx-auto mb-6 text-2xl font-bold">Registration</h1>
              <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{width: "70%"}}
                autoComplete="off"
                onFinish={handleButtonSubmit}
                initialValues={{remember: true}}
              >
                  <Item<FieldType>
                    label="First Name"
                    name="first_name"
                    rules={[{required: true, message: 'Please input your first name!'}]}
                  >
                      <Input />
                  </Item>

                  <Item<FieldType>
                    label="Last Name"
                    name="last_name"
                    rules={[{required: true, message: 'Please input your last name!'}]}
                  >
                      <Input />
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
                      <Input />
                  </Item>

                  <Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: 'Please input your password!'},
                        {min: 4, message: "Password should be at least 4 character"},
                    ]}
                  >
                      <Password />
                  </Item>

                  <Item<FieldType>
                    label="Confirm Password"
                    name="confirm_password"
                    rules={[
                        {required: true, message: 'Please input your password!'},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password" as NamePath) === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                  >
                      <Password />
                  </Item>

                  <Item wrapperCol={{offset: 8, span: 16}}>
                      <Button type="primary" htmlType="submit" loading={isLoading}>
                          Submit
                      </Button>
                  </Item>
              </Form>
              <div className="mx-auto">If you already have account <Link href={"/auth/login"}>Login</Link></div>
          </Content>
      </Layout>
    )
};

export default RegistrationPage;