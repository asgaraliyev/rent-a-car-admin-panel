import FilesCol from "../files/collection";
import { CategoriesCol } from "./collection";

Meteor.publishComposite("get.categories.all", function (query = {}) {
  return {
    find() {
      return CategoriesCol.find(query);
    },
    children:[
      {
          find(product){
              return FilesCol.find({"meta.category_id":product._id}).cursor
          }
      }
  ]
  };
});
