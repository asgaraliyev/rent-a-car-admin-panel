import { useNavigate } from "react-router";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Button, Space, Form, Input, InputNumber, Upload, Select } from "antd";
import { Random } from "meteor/random";
import { onCustomerFinish } from "../../../helpers/functions";
import { CustomerCommonFields } from "./CustomerEdit";
export function CustomerAddPage() {
  const navigate = useNavigate();


  return (
    <Form
      name="basic"
      onFinish={(values) => {
        values._id = Random.id();
        onCustomerFinish(values, (values) => {
          navigate("/customers");
        });
      }}
      layout="vertical"
      autoComplete="off"
    >
      <CustomerCommonFields />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Göndər
        </Button>
      </Form.Item>
    </Form>
  );
}
