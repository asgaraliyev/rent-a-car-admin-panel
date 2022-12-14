import React from "react";
import {useTracker} from "meteor/react-meteor-data"
import {CategoriesCol} from "../../../api/categories/collection";
import { Link } from "react-router-dom";
import { Button, notification, Popconfirm, Table } from "antd";
export function CategoriesPage() {
    const { categories } = useTracker(() => {
      Meteor.subscribe("get.categories.all");
      return {
        categories: CategoriesCol.find().fetch(),
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
              <Link to={`/categories-edit/${data._id}`}>
                <Button type="warning">Redaktə et</Button>
              </Link>

            <Popconfirm
                title="Bu sifarişı silməyə əminsiniz?"
                onConfirm={() => {
                  Meteor.call("remove_category", [data._id], (err, res) => {
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
   
    ];
  
    return (
      <>
        <h1>
          Kateqoriyalar
          <Link to="/category-add">
            <Button type="primary">Yeni</Button>
          </Link>
        </h1>
        <Table dataSource={categories} columns={columns} />
      </>
    );
  }