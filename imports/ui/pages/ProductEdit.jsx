import { useNavigate, useParams } from "react-router";
import React from "react";
import {useTracker} from "meteor/react-meteor-data"
import ProductsCol from "../../api/products/collection";
import { Button, Form, Input, InputNumber, Space, Upload } from "antd";
import { onProductFinish } from "../../helpers/functions";
import FilesCol from "../../api/files/collection";
import { CommonFields } from "./ProductAdd";
export function ProductEditPage() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const { product } = useTracker(() => {
      Meteor.subscribe("get.products.all", { _id }, (err, res) => {
        setLoading(false);
      });
      return {
        product: ProductsCol.findOne({ _id }),
      };
    }, []);
    if (!product || loading) return <h1>Yüklənir...</h1>;
    return (
      <Form
        initialValues={product}
        name="basic"
        onFinish={(values)=>{
          values._id=product._id
          onProductFinish(values, () => {
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
            onChange={(a, b) => {
              Meteor.call("remove_files", [a.file._id]);
            }}
            defaultFileList={FilesCol.find({ "meta.product_id": product._id })
              .fetch()
              .map((a) => {
                console.log("a", a);
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
                    rules={[{ required: true, message: "Xüsusiyyət adı daxil edin" }]}
                  >
                    <Input style={{ width: "50%" }} placeholder="Xüsusiyyət adı" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                    rules={[{ required: true, message: "Xüsusiyyət dəyərii daxil edin" }]}
                  >
                    <Input placeholder="Xüsusiyyət dəyəri" style={{ width: "50%" }} />
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
        <CommonFields/>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Göndər
          </Button>
        </Form.Item>
      </Form>
    );
  }