import React from "react";
import {useTracker} from "meteor/react-meteor-data"
import {RequestsCol} from "../../api/requests/collection";
import { Link } from "react-router-dom";
import { Button, notification, Popconfirm, Table } from "antd";
export function RequestsPage() {
    const { requests } = useTracker(() => {
      Meteor.subscribe("get.requests.all");
      return {
        requests: RequestsCol.find().fetch(),
      };
    }, []);
    console.log("requests",RequestsCol.find().fetch())
    const columns = [
      {
        title: "Əməliyyat",
        dataIndex: "key",
        key: "key",
        render: (_, data) => {
          return (
            <>
              <Link to={`/requests/${data._id}`}>
                <Button type="warning">Detaylı</Button>
              </Link>
              <Popconfirm
                title="Bu istəyi silməyə əminsiniz?"
                onConfirm={() => {
                  Meteor.call("remove_request", [data._id], (err, res) => {
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
        title: "Telefon",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Mesaj",
        dataIndex: "message",
        key: "message",
      },
    ];
  
    return (
      <>
        <h1>
          İstəklər
        </h1>
        <Table dataSource={requests} columns={columns} />
      </>
    );
  }