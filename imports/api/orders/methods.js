import FilesCol from "../files/collection";
import {OrdersCol} from "../orders/collection";
function update_order(data) {
    const p_id=data._id
    delete data._id
    const query={_id:p_id}
    OrdersCol.update(query,{
        $set:data
    })
  return OrdersCol.findOne(query);

}
function add_order(data) {
  OrdersCol.insert(data);
  return OrdersCol.findOne({ _id: data._id });
}
function modify_order(data) {
  const isExists = OrdersCol.findOne({ _id: data._id });
  if (isExists) {
    return update_order(data);
  } else {
    return add_order(data);
  }
}
function remove_order(ids) {
  const query={ _id: { $in: ids } }
  OrdersCol.remove(query);
  FilesCol.remove({"meta.order_id":{$in:ids}})
  return true;
}
const order_methods = {
  modify_order,
  remove_order,
};
Meteor.methods(order_methods);
export default order_methods;
