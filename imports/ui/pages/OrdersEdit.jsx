import { useNavigate, useParams } from "react-router";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Button, Space, Form, Input, InputNumber, Upload, Select } from "antd";
import { Random } from "meteor/random";
import ProductsCol from "../../api/products/collection";
import { onOrderFinish } from "../../helpers/functions";
import { OrdersCol } from "../../api/orders/collection";
import moment from "moment";
export function OrderCommonFields({ products }) {
  console.log("products",products)
  return (
    <>
      <span>
        <h1>Sifariş</h1>
      </span>
      <span>
        <Button type="primary">Yol vərəqəsini çap et</Button>
      </span>
      <span>
        <Button type="success">Müqaviləni çap et</Button>
      </span>

      <Form.Item
        label="Sifarişçinin adı"
        name="firstname"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa sifarişçinin adı daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Sifarişçinin soyadı"
        name="lastname"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa sifarişçinin soyadını daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Sifarişçinin atasının adı"
        name="father_name"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa sifarişçinin atasının adı daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Sifarişçinin cinsiyyəti"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa sifarişçinin cinsiyyətini seçin!",
          },
        ]}
      >
        <Select
          style={{ width: "100%" }}
          options={[
            {
              label: "Kişi",
              value: 0,
            },
            {
              label: "Qadın",
              value: 1,
            },
          ]}
          placeholder="Sifarişçinin cinsiyyəti seçin"
        />
      </Form.Item>

      <Form.Item
        label="Qiymət"
        name="price"
        rules={[
          { required: true, message: "Zəhmət olmasa qiyməti daxil edin!" },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Günlərin sayı"
        name="days"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa günlərin sayını daxil edin!",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Şəxsiyyət vəsiqəsinin nömrəsi"
        name="ID_number"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa şəxsiyyət vəsiqəsinin nömrəsi daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Sürücülük vəsiqəsinin nömrəsi"
        name="driver_id_number"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa sürücülük vəsiqəsinin nömrəsi daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Hərəkət ərazisi və istiqaməti"
        name="area"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa hərəkət ərazisi və istiqaməti daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Hərəkət ərazisi və istiqaməti"
        name="area"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa hərəkət ərazisi və istiqaməti daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Vaxt aralığı"
        name="date_range"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa hərəkət ərazisi və istiqaməti daxil edin!",
          },
        ]}
      >
        <RangePicker />
      </Form.Item>
      <Form.Item
        name="product_id"
        label="Maşını seçin"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa hərəkət ərazisi və istiqaməti daxil edin!",
          },
        ]}
      >
        <Select
          style={{ width: "100%" }}
          options={products.map((p) => {
            return {
              label: `${p.name}/${p.price} AZN /`,
              value: p._id,
            };
          })}
          placeholder="Maşını seçin"
        />
      </Form.Item>
    </>
  );
}
export function OrderEditPage() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { products, order } = useTracker(() => {
    Meteor.subscribe("get.products.all", {});
    Meteor.subscribe("get.orders.all", { _id });

    const res = {
      products: ProductsCol.find().fetch(),
      order: OrdersCol.findOne({ _id }),
    };
    if (res.order) {
      console.log("res", res.order.date_range);
      res.order.date_range = res.order.date_range.map((a) => {
        return moment(a);
      });
    }
    return res;
  }, []);
  if (!products.length)
    return <h1>Sifariş üçün ən azı 1 ədəd maşın daxil etməlisiniz</h1>;
  if (!order) return <h1>Sifariş tapılmadı</h1>;
  return (
    <Form
      name="basic"
      initialValues={order}
      onFinish={(values) => {
        values._id = order._id;
        onOrderFinish(values, (values) => {
          navigate("/orders");
        });
      }}
      layout="vertical"
      autoComplete="off"
    >
      <OrderCommonFields products={products} />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Göndər
        </Button>
      </Form.Item>
    </Form>
  );
}
