import { CustomersCol } from "./collection";

Meteor.publishComposite("get.customers.all", function (query = {}) {
  return {
    find() {
      return CustomersCol.find(query);
    },
    children: [],
  };
});
