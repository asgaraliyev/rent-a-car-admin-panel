import FilesCol from "./collection"

const file_methods={
    remove_files(_ids   ){
        FilesCol.remove({_id:{$in:_ids}})
    }
}
Meteor.methods(file_methods)
export default file_methods