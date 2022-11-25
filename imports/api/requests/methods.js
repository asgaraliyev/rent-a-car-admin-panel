import { RequestsCol } from "./collection"

export const request_methods={
    add_request(data){
        data.createdAt=new Date()
        RequestsCol.insert(data)   
    }
}