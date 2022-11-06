import FilesCol from "../files/collection";
import ProductsCol from "./collection";
import slugify from "slugify";
function update_product(data) {
    const p_id=data._id
    delete data._id
    const query={_id:p_id}
    ProductsCol.update(query,{
        $set:data
    })
  return ProductsCol.findOne(query);

}
function add_product(data) {
  data.slug=slugify(data.name)
  ProductsCol.insert(data);
  return ProductsCol.findOne({ _id: data._id });
}
function modify_product(data) {
  const isExists = ProductsCol.findOne({ _id: data._id });
  if (isExists) {
    return update_product(data);
  } else {
    return add_product(data);
  }
}
function remove_product(ids) {
  const query={ _id: { $in: ids } }
  ProductsCol.remove(query);
  FilesCol.remove({"meta.product_id":{$in:ids}})
  return true;
}
const product_methods = {
  modify_product,
  remove_product,
};
Meteor.methods(product_methods);
export default product_methods;
