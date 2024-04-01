"use client"
import {Content} from "antd/es/layout/layout";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Button, Form, Input, Layout, message} from "antd";
import {loginAccount} from "../../../api/requests/auth-requests";
import {LocalStorageConstants} from "../../../constants/localstorage-constants";
import FloatGoBackButton from "../../../shared/FloatGoBackButton";
import FloatGoHomeButton from "../../../shared/FloatGoHomeButtons";

type FieldType = {
    email: string;
    password: string;
};

const {Item} = Form;
const {Password} = Input;

const loginPage = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleButtonSubmit = async (value: FieldType) => {
        try {
            setIsLoading(true);
            const user = await loginToAccount(value);
            await messageApi.open({
                type: "success",
                content: `Welcome ${user.first_name} ${user.last_name}`,
                duration: 3
            });
            router.push("/");
        } catch (e) {
            messageApi.open({
                type: "error",
                content: e.message,
                duration: 3
            });
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const loginToAccount = async (userData: FieldType) => {
        const {data} = await loginAccount(userData);
        localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, data.access_token);
        return data;
    };

    return (
      <>
          <Layout style={{height: "100vh", position: "relative"}}>
              {contextHolder}
              <Content style={{padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", width: "50%", marginInline: "auto"}}>
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
                  <div className="mx-auto">If you don't have an account, <Link href={"/auth/registration"}>Register now</Link></div>
              </Content>
          </Layout>
          <FloatGoHomeButton />
      </>
    )
};

export default loginPage;
