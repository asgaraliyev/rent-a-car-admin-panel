import FilesCol from "../files/collection";
import {BannersCol} from "../banners/collection";
import { makeSlug } from "../../helpers/functions";
function update_banner(data) {
    const p_id=data._id
    delete data._id
    const query={_id:p_id}
    BannersCol.update(query,{
        $set:data
    })
  return BannersCol.findOne(query);

}
function add_banner(data) {
  data.slug=makeSlug(data.name)
  BannersCol.insert(data);
  return BannersCol.findOne({ _id: data._id });
}
function modify_banner(data) {
  const isExists = BannersCol.findOne({ _id: data._id });
  if (isExists) {
    return update_banner(data);
  } else {
    return add_banner(data);
  }
}
function remove_banner(ids) {
  const query={ _id: { $in: ids } }
  BannersCol.remove(query);
  FilesCol.remove({"meta.banner_id":{$in:ids}})
  return true;
}
const banner_methods = {
  modify_banner,
  remove_banner,
};
Meteor.methods(banner_methods);
export default banner_methods;
