import React from "react";
import {useTracker} from "meteor/react-meteor-data"
import {OrdersCol} from "../../api/orders/collection";
import { Link } from "react-router-dom";
import { Button, notification, Popconfirm, Table } from "antd";
export function OrdersPage() {
    const { orders } = useTracker(() => {
      Meteor.subscribe("get.orders.all");
      return {
        orders: OrdersCol.find().fetch(),
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
              <Link to={`/orders-edit/${data._id}`}>
                <Button type="warning">Redaktə et</Button>
              </Link>

              {/* <Popconfirm
                title="Bu sifarişı silməyə əminsiniz?"
                onConfirm={() => {
                  Meteor.call("remove_order", [data._id], (err, res) => {
                    notification.success({ message: "Uğurla silindi" });
                  });
                }}
                okText="Bəli"
                cancelText="Xeyr"
              >
                <Button type="danger">Sil</Button>
              </Popconfirm> */}
            </>
          );
        },
      },
      {
        title: "Adı",
        dataIndex: "firstname",
        key: "firstname",
      },
      {
        title: "Soyadı",
        dataIndex: "lastname",
        key: "lastname",
      },
    ];
  
    return (
      <>
        <h1>
          Sifarişlər
          <Link to="/orders-add">
            <Button type="primary">Yeni</Button>
          </Link>
        </h1>
        <Table dataSource={orders} columns={columns} />
      </>
    );
  }