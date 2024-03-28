"use client"

import {FC} from "react";
import {Button, Flex, Form, Input, message, Space} from "antd";
import {createSize, updateSize} from "../../api/requests/size-requests";
import type {ISize} from "../../types/ISize";

interface SizeFormProps {
  size?: ISize;
  formType: "add" | "edit";
  onSubmit: () => void;
  onCancel: () => void;
}

const SizeForm: FC<SizeFormProps> = ({size, formType, onCancel, onSubmit}) => {
  const [form] = Form.useForm();

  const handleSubmitButtonClick = async (data: {name: string}) => {
    try {
      if (formType === "edit")  {
        await updateSize({...data, id: size?.id!})
      } else {
        await createSize(data.name);
      }
      onSubmit();
      message.success(`Size has been successfully ${formType === "add" ? 'added' : "edited"}`)
    } catch (e) {
      message.error("Oops something went wrong");
    }
  };

  return (
    <Form
      form={form}
      name="Size Form"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
      onFinish={handleSubmitButtonClick}
    >
      <Form.Item
        label="Size Name"
        name="name"
        initialValue={size?.name || ""}
        rules={[
          {
            required: true,
            message: 'Please input size name!',
          },
        ]}
      >
        <Input />
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
      </Flex>
    </Form>
  );
};

export default SizeForm;