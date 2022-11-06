import FilesCol from "../files/collection"
import ProductsCol from "./collection"

Meteor.publishComposite("get.products.all",function(query={}){
    return {
        find(){
            return ProductsCol.find(query)
        },
        children:[
            {
                find(product){
                    return FilesCol.find({"meta.product_id":product._id}).cursor
                }
            }
        ]
    }
})