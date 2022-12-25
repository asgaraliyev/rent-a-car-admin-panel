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
import "../imports/api/categories/index"

import ProductsCol from '../imports/api/products/collection';
import FilesCol from '../imports/api/files/collection';
import { request_methods } from '../imports/api/requests/methods';
import { CategoriesCol } from '../imports/api/categories/collection';
import { BannersCol } from '../imports/api/banners/collection';
const users=[
  {
    username:"rufet",
    password:"Balakhani_702"
  }
]

Meteor.startup(()=>{
  users.map(user=>{
    if(!Meteor.users.findOne({username:user.username})){
      Accounts.createUser(user)
    }
  })
})
function productsController(req, res, next)  {
  res.writeHead(200);
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
function categoriesController(req,res,next){
  res.end(JSON.stringify(CategoriesCol.find().fetch()))
}
function bannersController(req,res,next){
  return res.end(JSON.stringify(BannersCol.find().fetch().map(banner=>{
    console.log(banner)
    banner.imageIds=FilesCol.find({"meta.banner_id":banner._id}).fetch().map(file=>{
      return FilesCol.findOne({_id:file._id}).link()
    })
    banner.mainImageId=banner.imageIds[0]
    return banner
  })))
}
WebApp.rawConnectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  return next();
})
WebApp.connectHandlers.use((req, res, next) => {

  if (req.url.includes('/api/products') ) {
    productsController(req,res,next)
  } else if(req.url.includes('/api/new-request')){
    newRequestController(req,res,next)
  }
  else if(req.url.includes('/api/categories')){
    categoriesController(req,res,next)
  }
  else if(req.url.includes('/api/banners')){
    bannersController(req,res,next)
  }
  else {
    next();
  }
});


Meteor.startup(() => {
});
