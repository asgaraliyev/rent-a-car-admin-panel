import { useNavigate, useParams } from "react-router";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { DatePicker, Rate } from "antd";
const { RangePicker } = DatePicker;
import { Button, Space, Form, Input, InputNumber, Upload, Select } from "antd";
import { onCategoryFinish } from "../../../helpers/functions";
import { CategoriesCol } from "../../../api/categories/collection";
import FilesCol from "../../../api/files/collection";
export function CategoryCommonFields({}) {
  return (
    <>
      <span>
        <h1>Kateqoriya</h1>
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
export function CategoryEditPage() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { category } = useTracker(() => {
    Meteor.subscribe("get.categories.all", { _id });

    const res = {
      category: CategoriesCol.findOne({ _id }),
    };
    if (res.category) {
    }
    return res;
  }, []);

  if (!category) return <h1>Category tapılmadı</h1>;
  return (
    <Form
      name="basic"
      initialValues={category}
      onFinish={(values) => {
        values._id = category._id;
        onCategoryFinish(values, (values) => {
          navigate("/categories");
        });
      }}
      layout="vertical"
      autoComplete="off"
    >
      <CategoryCommonFields />
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
          defaultFileList={FilesCol.find({ "meta.category_id": category._id })
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
