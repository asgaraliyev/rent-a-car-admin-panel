import moment from "moment";
import { CustomersCol } from "../customers/collection";
import FilesCol from "../files/collection";
import { OrdersCol } from "../orders/collection";
import ProductsCol from "../products/collection";
function update_order(data) {
  const p_id = data._id
  delete data._id
  const query = { _id: p_id }
  OrdersCol.update(query, {
    $set: data
  })
  return OrdersCol.findOne(query);

}
function add_order(data) {
  // let lastOrder = OrdersCol.find().fetch()
  // console.log("lastOrder", lastOrder[lastOrder.length - 1])
  // data.order_number = (lastOrder[lastOrder.length - 1].order_number + 1) || 1
  let orders = OrdersCol.find().fetch()
  orders.sort((a,b)=>a.order_number<b.order_number? 1 : -1)
  let largestOrderNumber = orders[0]?.order_number
  data.order_number = largestOrderNumber + 1 || 1
  OrdersCol.insert(data);
  return OrdersCol.findOne({ _id: data._id });
}
function get_order_pdf_muqavile(_id) {
  const order = OrdersCol.findOne({ _id })
  const product = ProductsCol.findOne({ _id: order.product_id })
  const customer = CustomersCol.findOne({ _id: order.customer_id })
  customer.full_name = customer.firstname + " " + customer.lastname + " " + customer.father_name + ` ${customer.gender == 1 ? "qızı" : "oğlu"}`
  return {
    order,
    product,
    customer,
    date: new Date(),
    date_text: moment(new Date()).format("DD/MM/YYYY"),

  }
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
  const query = { _id: { $in: ids } }
  OrdersCol.remove(query);
  FilesCol.remove({ "meta.order_id": { $in: ids } })
  return true;
}
const order_methods = {
  modify_order,
  get_order_pdf_muqavile,
  remove_order,
};
Meteor.methods(order_methods);
export default order_methods;
