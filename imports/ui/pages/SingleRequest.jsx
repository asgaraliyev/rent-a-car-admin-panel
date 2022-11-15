import React from "react";
import { useParams } from "react-router";
import { useTracker } from "meteor/react-meteor-data";
import { RequestsCol } from "../../api/requests/collection";
export function SingleRequest() {
  const { _id } = useParams();
  const { request } = useTracker(() => {
    Meteor.subscribe("get.requests.all",{_id})
    return {request:RequestsCol.findOne({_id})}
  }, []);
  if(!request)return <h1>Yüklənir...</h1>
  return (
    <div>
      <ul>
        <li>
          <strong>Ad:</strong>
          <span>{request.name}</span>
        </li>
        <li>
          <strong>Telefon:</strong>
          <span>{request.phone}</span>
        </li>
        <li>
          <strong>Mesaj:</strong>
          <span>{request.message}</span>
        </li>
        <li>
          <strong>Tarix:</strong>
          <span>{JSON.stringify(request.createdAt)}</span>
        </li>
      </ul>
    </div>
  );
}
