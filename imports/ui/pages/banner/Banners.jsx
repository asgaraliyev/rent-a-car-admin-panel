import React from "react";
import {useTracker} from "meteor/react-meteor-data"
import {BannersCol} from "../../../api/banners/collection";
import { Link } from "react-router-dom";
import { Button, notification, Popconfirm, Table } from "antd";
export function BannersParge() {
    const { banners } = useTracker(() => {
      Meteor.subscribe("get.banners.all");
      return {
        banners: BannersCol.find().fetch(),
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
              <Link to={`/banners-edit/${data._id}`}>
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
        dataIndex: "name",
        key: "name",
      },
   
    ];
  
    return (
      <>
        <h1>
          Bannerlər
          <Link to="/banner-add">
            <Button type="primary">Yeni</Button>
          </Link>
        </h1>
        <Table dataSource={banners} columns={columns} />
      </>
    );
  }