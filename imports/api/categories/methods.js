import FilesCol from "../files/collection";
import {CategoriesCol} from "../categories/collection";
import { makeSlug } from "../../helpers/functions";
function update_category(data) {
    const p_id=data._id
    delete data._id
    const query={_id:p_id}
    CategoriesCol.update(query,{
        $set:data
    })
  return CategoriesCol.findOne(query);

}
function add_category(data) {
  data.slug=makeSlug(data.name)
  CategoriesCol.insert(data);
  return CategoriesCol.findOne({ _id: data._id });
}
function modify_category(data) {
  const isExists = CategoriesCol.findOne({ _id: data._id });
  if (isExists) {
    return update_category(data);
  } else {
    return add_category(data);
  }
}
function remove_category(ids) {
  const query={ _id: { $in: ids } }
  CategoriesCol.remove(query);
  FilesCol.remove({"meta.category_id":{$in:ids}})
  return true;
}
const category_methods = {
  modify_category,
  remove_category,
};
Meteor.methods(category_methods);
export default category_methods;
