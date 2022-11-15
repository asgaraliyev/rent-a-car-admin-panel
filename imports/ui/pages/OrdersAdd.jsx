import { useNavigate } from "react-router";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Button, Space, Form, Input, InputNumber, Upload, Select } from "antd";
import { Random } from "meteor/random";
import ProductsCol from "../../api/products/collection";
import { onOrderFinish } from "../../helpers/functions";
import { OrderCommonFields } from "./OrdersEdit";
export function OrderAddPage() {
  const navigate = useNavigate();
  const { products } = useTracker(() => {
    Meteor.subscribe("get.products.all", {});
    return { products: ProductsCol.find().fetch() };
  }, []);

  return (
    <Form
      name="basic"
      onFinish={(values) => {
        values._id = Random.id();
        onOrderFinish(values, (values) => {
          navigate("/orders");
        });
      }}
      layout="vertical"
      autoComplete="off"
    >
      <OrderCommonFields  products={products}/>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Göndər
        </Button>
      </Form.Item>
    </Form>
  );
}
