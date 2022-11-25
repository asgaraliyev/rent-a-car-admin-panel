import FilesCol from "../files/collection";
import { BannersCol } from "./collection";

Meteor.publishComposite("get.banners.all", function (query = {}) {
  return {
    find() {
      return BannersCol.find(query);
    },
    children:[
      {
          find(product){
              return FilesCol.find({"meta.banner_id":product._id}).cursor
          }
      }
  ]
  };
});
