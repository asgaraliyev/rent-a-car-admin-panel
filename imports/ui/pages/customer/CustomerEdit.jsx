import { useNavigate, useParams } from "react-router";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { DatePicker,Rate ,} from "antd";
const { RangePicker } = DatePicker;
import { Button, Space, Form, Input, InputNumber, Upload, Select } from "antd";
import { Random } from "meteor/random";
import { onCustomerFinish } from "../../../helpers/functions";
import { CustomersCol } from "../../../api/customers/collection";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
export function CustomerCommonFields({  }) {
  return (
    <>
      <span>
        <h1>Müştəri</h1>
      </span>

      <Form.Item
        label="Ad"
        name="firstname"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa  adı daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Soyad"
        name="lastname"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa soyadını daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Atasının adı"
        name="father_name"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa  atasının adı daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Cinsiyyəti"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa cinsiyyətini seçin!",
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
          placeholder="Cinsiyyəti seçin"
        />
      </Form.Item>

      <Form.Item
        label="Doğum tarixi"
        name="birth_date"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa doğum tarixi  daxil edin!",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="FİN  kod"
        name="fin_code"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa FIN kou daxil edin!",
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
        label="Rating"
        name="rating"
        
      >
       <Rate allowHalf defaultValue={0} />
      </Form.Item>
      <Form.Item  label="Qeydlər"
        name="note">
          <TextArea rows={4} />
        </Form.Item>
    </>
  );
}
export function CustomerEditPage() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const {  customer } = useTracker(() => {
    Meteor.subscribe("get.customers.all", { _id });

    const res = {
      customer: CustomersCol.findOne({ _id }),
    };
    if (res.customer) {
      res.customer.birth_date=moment(res.customer.birth_date)
      
    }
    return res;
  }, []);

  if (!customer) return <h1>Müştəri tapılmadı</h1>;
  return (
    <Form
      name="basic"
      initialValues={customer}
      onFinish={(values) => {
        values._id = customer._id;
        onCustomerFinish(values, (values) => {
          navigate("/customers");
        });
      }}
      layout="vertical"
      autoComplete="off"
    >
      <CustomerCommonFields  />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Göndər
        </Button>
      </Form.Item>
    </Form>
  );
}
