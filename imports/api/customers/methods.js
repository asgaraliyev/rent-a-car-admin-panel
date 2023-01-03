import FilesCol from "../files/collection";
import {CustomersCol} from "../customers/collection";
import { makeSlug } from "../../helpers/functions";
function update_customer(data) {
    const p_id=data._id
    delete data._id
    const query={_id:p_id}
    CustomersCol.update(query,{
        $set:data
    })
  return CustomersCol.findOne(query);

}
function add_customer(data) {
  data.slug=makeSlug(data.firstname+data.lastname)
  CustomersCol.insert(data);
  return CustomersCol.findOne({ _id: data._id });
}
function modify_customer(data) {
  const isExists = CustomersCol.findOne({ _id: data._id });
  if (isExists) {
    return update_customer(data);
  } else {
    return add_customer(data);
  }
}
function remove_customer(ids) {
  const query={ _id: { $in: ids } }
  CustomersCol.remove(query);
  FilesCol.remove({"meta.customer_id":{$in:ids}})
  return true;
}
const customer_methods = {
  modify_customer,
  remove_customer,
};
Meteor.methods(customer_methods);
export default customer_methods;
