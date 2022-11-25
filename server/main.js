import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import {WebApp} from "meteor/webapp"
import "../imports/api/files/collection"
import "../imports/api/requests/collection"
import "../imports/api/orders/collection"
import "../imports/api/orders/methods"
import "../imports/api/orders/publications"
import "../imports/api/requests/methods"
import "../imports/api/requests/publications"
import "../imports/api/files/methods"
import "../imports/api/files/publications"
import "../imports/api/products/collection"
import "../imports/api/products/methods"
import "../imports/api/products/publications"


import "../imports/api/customers/index"
import "../imports/api/banners/index"

import ProductsCol from '../imports/api/products/collection';
import FilesCol from '../imports/api/files/collection';
import { request_methods } from '../imports/api/requests/methods';
function productsController(req, res, next)  {
  res.writeHead(200);
  console.log("req",req.query)
  let products=ProductsCol.find().fetch()
  products=products.map(product=>{
    product.imageIds=FilesCol.find({"meta.product_id":product._id}).fetch().map(file=>{
      const res= FilesCol.findOne({_id:file._id}).link()
      return res
    })
    product.mainImageId=product.imageIds[0]
    return product
  })
  res.end(JSON.stringify(products))
}
function newRequestController(req,res,next){
  const {data}=req.query
  request_methods.add_request(JSON.parse(data))
  res.end("done")
}
WebApp.rawConnectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  return next();
})
WebApp.connectHandlers.use((req, res, next) => {

  if (req.url.includes('/api/products') ) {
  console.log(req.url.includes('/api/products'),req.url,req.query)

    productsController(req,res,next)
  } else if(req.url.includes('/api/new-request')){
    newRequestController(req,res,next)
  }
  else {
    next();
  }
});


Meteor.startup(() => {
});
