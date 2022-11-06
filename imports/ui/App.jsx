import React from "react";
import { BrowserRouter, NavLink, useParams } from "react-router-dom";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import "./main.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import {
  Space,
  Popconfirm,
  InputNumber,
  Upload,
  Input,
  Menu,
  Table,
  Button,
  Form,
  notification,
} from "antd";
import { Random } from "meteor/random";
import { useTracker } from "meteor/react-meteor-data";
import "antd/dist/antd.css";
import { uploadToServer } from "../helpers/functions";
import ProductsCol from "../api/products/collection";
import FilesCol from "../api/files/collection";
function ProductsPage() {
  const { products } = useTracker(() => {
    Meteor.subscribe("get.products.all");
    return {
      products: ProductsCol.find().fetch(),
    };
  }, []);

  const columns = [
    {
      title: "Əməliyyat",
      dataIndex: "key",
      key: "key",
      render: (_, data) => {
        return (
          <>
            <Link to={`/products-edit/${data._id}`}>
              <Button type="warning">Redaktə et</Button>
            </Link>
            <Popconfirm
              title="Bu maşını silməyə əminsiniz?"
              onConfirm={() => {
                Meteor.call("remove_product", [data._id], (err, res) => {
                  notification.success({ message: "Uğurla silindi" });
                });
              }}
              okText="Bəli"
              cancelText="Xeyr"
            >
              <Button type="danger">Sil</Button>
            </Popconfirm>
          </>
        );
      },
    },
    {
      title: "Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Qiymət",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <>
      <h1>
        Maşınlar
        <Link to="/products-add">
          <Button type="primary">Yeni</Button>
        </Link>
      </h1>
      <Table dataSource={products} columns={columns} />
    </>
  );
}
function MainLayout() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div id="menu-area" className={isOpen ? "slide-right" : "slide-left"}>
        {isOpen == true ? (
          <AiOutlineClose
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="menu-btn"
          />
        ) : (
          <AiOutlineMenu
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="menu-btn"
          />
        )}
        <br></br>
        <br></br>
        <Menu>
          <Menu.Item>
            <NavLink to="/products">Maşınlar</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/orders">Sifarişlər</NavLink>
          </Menu.Item>
        </Menu>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

async function onProductFinish(values, callback) {
  console.log("values",values)
  if(values.imageIds.fileList){
    values.imageIds = values.imageIds.fileList.map((file) => file.originFileObj);
    for (let index = 0; index < values.imageIds.length; index++) {
      const file = values.imageIds[index];
      console.log("file", file);
      if(file){
        const fileObj = await uploadToServer({
          file,

          other: {
            meta: {
              product_id: values._id,
            },
          },
        });
      } 
      
    }
  }
  
  Meteor.call("modify_product", values, (err, res) => {
    if (err) {
      console.log(err);
    }
    if (res) {
      notification.success({ message: "Uğurla modifikasiya edildi" });
      callback();
    }
  });
}
function ProductAddPage() {
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Göndər
        </Button>
      </Form.Item>
    </Form>
  );
}
function ProductEditPage() {
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
            console.log("a,b", a, b);
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Göndər
        </Button>
      </Form.Item>
    </Form>
  );
}
export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<MainLayout></MainLayout>}>
        <Route path="products" exact element={<ProductsPage />} />

        <Route path="products-add" exact element={<ProductAddPage />} />
        <Route path="products-edit/:_id" exact element={<ProductEditPage />} />
        <Route path="orders" exact element={<ProductsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
