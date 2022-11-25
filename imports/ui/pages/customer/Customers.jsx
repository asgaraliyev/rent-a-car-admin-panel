import React from "react";
import {useTracker} from "meteor/react-meteor-data"
import {CustomersCol} from "../../../api/customers/collection";
import { Link } from "react-router-dom";
import { Button, notification, Popconfirm, Table } from "antd";
export function CustomersParge() {
    const { customers } = useTracker(() => {
      Meteor.subscribe("get.customers.all");
      return {
        customers: CustomersCol.find().fetch(),
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
              <Link to={`/customers-edit/${data._id}`}>
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
          Müştərilər
          <Link to="/customer-add">
            <Button type="primary">Yeni</Button>
          </Link>
        </h1>
        <Table dataSource={customers} columns={columns} />
      </>
    );
  }