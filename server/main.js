import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import {WebApp} from "meteor/webapp"
import "../imports/api/files/collection"
import "../imports/api/files/methods"
import "../imports/api/files/publications"
import "../imports/api/products/collection"
import "../imports/api/products/methods"
import "../imports/api/products/publications"
import ProductsCol from '../imports/api/products/collection';
import FilesCol from '../imports/api/files/collection';
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
WebApp.connectHandlers.use((req, res, next) => {
  if (req.url.includes('/api/products') ) {
  console.log(req.url.includes('/api/products'),req.url,req.query)

    productsController(req,res,next)
  } else {
    next();
  }
});

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
});
