import React from "react";
import {useTracker} from "meteor/react-meteor-data"
import {OrdersCol} from "../../../api/orders/collection";
import { Link } from "react-router-dom";
import { Button, notification, Popconfirm, Table } from "antd";
import { CustomersCol } from "../../../api/customers/collection";
export function OrdersPage() {
    const { orders } = useTracker(() => {
      Meteor.subscribe("get.orders.all");
      Meteor.subscribe("get.customers.all");
      return {
        orders: OrdersCol.find().fetch(),
      };
    }, []);
  const customers = CustomersCol.find().fetch()
  orders.map(order=>{
    customers.map(customer => {
      if(order.customer_id === customer._id){
        return order.firstname = customer.firstname, order.lastname = customer.lastname
      }
      
    })
  })

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
        title: "Musteri adi",
        dataIndex: "firstname",
        key: "name"
      },
      {
        title: "Musteri soyadi",
        dataIndex: "lastname",
        key: "surname"
      },
      {
        title: "Qiymet",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Gün",
        dataIndex: "days",
        key: "days",
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