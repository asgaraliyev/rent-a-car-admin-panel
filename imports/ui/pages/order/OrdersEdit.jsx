import { useNavigate, useParams } from "react-router";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { DatePicker, notification } from "antd";
const { RangePicker } = DatePicker;
import { Button, Space, Form, Input, InputNumber, Upload, Select } from "antd";
import { Random } from "meteor/random";
import ProductsCol from "../../../api/products/collection";
import { onOrderFinish } from "../../../helpers/functions";
import { OrdersCol } from "../../../api/orders/collection";
import moment from "moment";
import { CustomersCol } from "../../../api/customers/collection";
import { Printer } from "../../../helpers/Printer";
export function OrderCommonFields({ onMuqavileClick, }) {
  const { products, customers } = useTracker(() => {
    Meteor.subscribe("get.products.all", {});
    Meteor.subscribe("get.customers.all", {});
    return { products: ProductsCol.find().fetch(), customers: CustomersCol.find().fetch() };
  }, []);
  if (!products.length) return <h1>Sifariş üçün ən azı 1 ədəd maşın daxil etməlisiniz</h1>;

  return (
    <>
      <span>
        <h1>Sifariş</h1>
      </span>
      <span>
        <Button type="primary">Yol vərəqəsini çap et</Button>
      </span>
      <span>
        <Button onClick={onMuqavileClick} type="success">Müqaviləni çap et</Button>
      </span>





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
      <Form.Item
        name="customer_id"
        label="Müştərini seçin"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa müştərini daxil edin!",
          },
        ]}
      >
        <Select
          style={{ width: "100%" }}
          options={customers.map((p) => {
            return {
              label: `${p.firstname} ${p.lastname}/rating:${p.rating}/${p.note}`,
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
  const { order } = useTracker(() => {
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
  async function onMuqavileClick() {
    Meteor.call("get_order_pdf_muqavile", _id, async function (err, res) {
      if (err) {
        notification.error({ message: "nese sehv getdi" })
      } else if (res) {
        const printer = new Printer({ url: `/pdf/permission/permission.html`, isDev: false });
        await printer.init();
        await printer.print(res);
      }
    })
  }
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
      <OrderCommonFields onMuqavileClick={onMuqavileClick} />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Göndər
        </Button>
      </Form.Item>
    </Form>
  );
}
