"use client"

import {FC} from "react";
import {Button, Flex, Form, Input, message, Space} from "antd";
import {createColor, updateColor} from "../../api/requests/color-request";
import type {IColor} from "../../types/IColor";

interface ColorFormProps {
  color?: IColor;
  formType: "add" | "edit";
  onSubmit: () => void;
  onCancel: () => void;
}

const ColorForm: FC<ColorFormProps> = ({color, formType, onCancel, onSubmit}) => {
  const [form] = Form.useForm();

  const handleSubmitButtonClick = async (data: {name: string}) => {
    try {
      if (formType === "edit")  {
        await updateColor({...data, id: color?.id!})
      } else {
        await createColor(data.name);
      }
      onSubmit();
      message.success(`Color has been successfully ${formType === "add" ? 'added' : "edited"}`)
    } catch (e) {
      message.error("Oops something went wrong");
    } finally {
    }
  };

  return (
    <Form
      form={form}
      name="Color Form"
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
        label="Color Name"
        name="name"
        initialValue={color?.name || ""}
        rules={[
          {
            required: true,
            message: 'Please input country name!',
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

export default ColorForm;