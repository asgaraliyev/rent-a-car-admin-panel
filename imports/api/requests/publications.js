import { RequestsCol } from "./collection";

Meteor.publishComposite("get.requests.all", function (query = {}) {
  return {
    find() {
      return RequestsCol.find(query);
    },
    children: [],
  };
});
