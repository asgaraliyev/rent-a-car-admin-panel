import { useNavigate } from "react-router";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Button, Space, Form, Input, InputNumber, Upload, Select } from "antd";
import { Random } from "meteor/random";
import { onBannerFinish } from "../../../helpers/functions";
import { BannerCommonFields } from "./BannerEdit";
export function BannerAddPage() {
  const navigate = useNavigate();


  return (
    <Form
      name="basic"
      onFinish={(values) => {
        values._id = Random.id();
        onBannerFinish(values, (values) => {
          navigate("/banners");
        });
      }}
      layout="vertical"
      autoComplete="off"
    >
      <BannerCommonFields />
      <Form.Item name="imageIds" label="Şəkilləri">
        <Upload
          name="imageİds"
          valuePropName="file"
          multiple={true}
          listType="picture-card"
          accept="image/*"
        >
          <Button>Yüklə</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Göndər
        </Button>
      </Form.Item>
    </Form>
  );
}
