import React from "react";
import {useTracker} from "meteor/react-meteor-data"
import ProductsCol from "../../api/products/collection";
import { Link } from "react-router-dom";
import { Button, notification, Popconfirm, Table } from "antd";
export function ProductsPage() {
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