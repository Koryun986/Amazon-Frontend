"use client"

import {Content} from "antd/es/layout/layout";
import {Button, Form, Input, Layout, message} from "antd";
import {NamePath} from "rc-field-form/es/interface";
import {changePassword} from "../../../api/requests/auth-requests";
import {LocalStorageConstants} from "../../../constants/localstorage-constants";
import {useUser} from "../../../hooks/user-hook";
import UnAuthorizedPage from "../../../shared/UnAuthorizedPage";
import {useRouter} from "next/navigation";
import {useState} from "react";

type FieldType = {
  password: string;
  new_password: string;
  confirm_new_password: string;
};

const {Item} = Form;
const {Password} = Input;

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useUser();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage()

  const handleButtonSubmit = async (data: FieldType) => {
    try {
      setIsLoading(true);
      const user = await changePassword({password: data.password, new_password: data.new_password});
      localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, user.access_token);
      await messageApi.open({
        type: "success",
        content: `Password has been successfully changed`,
        duration: 3
      });
      router.back();
    } catch (e) {
      messageApi.error(e.message)
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return (<UnAuthorizedPage />)
  }

  return (
    <Layout style={{height: "100vh", position: "relative"}}>
      {contextHolder}
      <Content style={{padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", width: "50%", marginInline: "auto"}}>
        <h1 className="mx-auto mb-6 text-2xl font-bold">Change Password</h1>
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
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 4, message: "Password should be at least 4 character" },
            ]}
          >
            <Password />
          </Item>
          <Item<FieldType>
            label="New Password"
            name="new_password"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 4, message: "Password should be at least 4 character" },
            ]}
          >
            <Password />
          </Item>
          <Item<FieldType>
            label="Confirm New Password"
            name="confirm_new_password"
            rules={[
              {required: true, message: 'Please confirm your new password!'},
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password" as NamePath) === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
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
}