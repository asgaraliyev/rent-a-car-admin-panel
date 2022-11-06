import ProductsCol from "./collection";
function update_product(data) {
    const p_id=data._id
    delete data._id
    ProductsCol.update({_id:p_id},{
        $set:data
    })
}
function add_product(data) {
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
  ProductsCol.remove({ _id: { $in: ids } });
  return true;
}
const product_methods = {
  modify_product,
  remove_product,
};
Meteor.methods(product_methods);
export default product_methods;
