import { useNavigate } from "react-router";
import React from "react";
import { Button, Space, Form, Input, InputNumber, Upload, Select } from "antd";
import { onProductFinish } from "../../../helpers/functions";
import { Random } from "meteor/random";
import { CategoriesCol } from "../../../api/categories/collection";
import {useTracker} from "meteor/react-meteor-data"
export function CommonFields() {
  const { categories } = useTracker(() => {
    Meteor.subscribe("get.categories.all");
    return { categories: CategoriesCol.find().fetch() };
  }, []);
  return (
    <>

      <Form.Item
        label="Markası"
        name="marka"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa maşının markasını daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="category_id"
        label="Kateqoriyası"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa kateqoriyası daxil edin!",
          },
        ]}
      >
        <Select
          style={{ width: "100%" }}
          options={categories.map((cat) => {
            return {
              label: cat.name,
              value: cat._id,
            };
          })}
          placeholder="Kateqoriyanı seçin"
        />
      </Form.Item>
      <Form.Item
        label="Qeydiyyat nişanı"
        name="car_id_number"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa maşının qeydiyyat nişanını daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Ban"
        name="ban"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa maşının ban nömrəsini daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Rəngi"
        name="color"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa rəngini daxil edin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Buraxılış ili"
        name="madeAt"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa buraxılış ilini daxil edin!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
    </>
  );
}
export function ProductAddPage() {
  const navigate = useNavigate();

  return (
    <Form
      name="basic"
      onFinish={(values) => {
        values._id = Random.id();
        onProductFinish(values, (values) => {
          navigate("/products");
        });
      }}
      layout="vertical"
      autoComplete="off"
    >
      <h1>Maşın</h1>
      <Form.Item
        label="Maşının adı"
        name="name"
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa maşının adını daxil edin!",
          },
        ]}
      >
        <Input />
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
      <Form.Item label="Açıqlama" name="description" rules={[]}>
        <Input />
      </Form.Item>
      <Form.Item name="imageIds" label="Maşın şəkilləri">
        <Upload
          name="logo"
          valuePropName="file"
          multiple={true}
          listType="picture-card"
          accept="image/*"
        >
          <Button>Yüklə</Button>
        </Upload>
      </Form.Item>
      <h3>Qiymətləndirilmə cədvəli:</h3>
      <Form.List name="prices_by_days">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "price"]}
                  rules={[{ required: true, message: "Qiymət daxil edin" }]}
                >
                  <InputNumber style={{ width: "50%" }} placeholder="Qiymət" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "days"]}
                  rules={[{ required: true, message: "Günləri daxil edin" }]}
                >
                  <InputNumber placeholder="Günlər" style={{ width: "50%" }} />
                </Form.Item>
                <Button type="danger" onClick={() => remove(name)}>
                  Sil
                </Button>
              </Space>
            ))}
            <Form.Item>
              <Button type="primary" onClick={() => add()} block>
                Qiymətləndirmə əlavə et
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <h3>Xüsusiyyətlər cədvəli:</h3>
      <Form.List name="propeties">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "key"]}
                  rules={[
                    { required: true, message: "Xüsusiyyət adı daxil edin" },
                  ]}
                >
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Xüsusiyyət adı"
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  rules={[
                    {
                      required: true,
                      message: "Xüsusiyyət dəyərii daxil edin",
                    },
                  ]}
                >
                  <Input
                    placeholder="Xüsusiyyət dəyəri"
                    style={{ width: "50%" }}
                  />
                </Form.Item>
                <Button type="danger" onClick={() => remove(name)}>
                  Sil
                </Button>
              </Space>
            ))}
            <Form.Item>
              <Button type="primary" onClick={() => add()} block>
                Xüsusiyyət əlavə et
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <CommonFields />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Göndər
        </Button>
      </Form.Item>
    </Form>
  );
}
