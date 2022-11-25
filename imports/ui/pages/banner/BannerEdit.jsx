import { useNavigate, useParams } from "react-router";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { DatePicker, Rate } from "antd";
const { RangePicker } = DatePicker;
import { Button, Space, Form, Input, InputNumber, Upload, Select } from "antd";
import { onBannerFinish } from "../../../helpers/functions";
import { BannersCol } from "../../../api/banners/collection";
import FilesCol from "../../../api/files/collection";
export function BannerCommonFields({}) {
  return (
    <>
      <span>
        <h1>Banner</h1>
      </span>

      <Form.Item
        label="Ad"
        name="name"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa  adı daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
export function BannerEditPage() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { banner } = useTracker(() => {
    Meteor.subscribe("get.banners.all", { _id });

    const res = {
      banner: BannersCol.findOne({ _id }),
    };
    if (res.banner) {
    }
    return res;
  }, []);

  if (!banner) return <h1>Banner tapılmadı</h1>;
  return (
    <Form
      name="basic"
      initialValues={banner}
      onFinish={(values) => {
        values._id = banner._id;
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
          name="logo"
          valuePropName="file"
          multiple={true}
          listType="picture-card"
          accept="image/*"
          onChange={(a, b) => {
            Meteor.call("remove_files", [a.file._id]);
          }}
          defaultFileList={FilesCol.find({ "meta.banner_id": banner._id })
            .fetch()
            .map((a) => {
              return {
                _id: a._id,
                uid: Math.random() * 1000,
                url: FilesCol.findOne({ _id: a._id }).link(),
              };
            })}
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
