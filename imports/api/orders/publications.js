import { OrdersCol } from "./collection";

Meteor.publishComposite("get.orders.all", function (query = {}) {
  return {
    find() {
      return OrdersCol.find(query);
    },
    children: [],
  };
});
