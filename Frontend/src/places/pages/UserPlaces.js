import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = () => {
  const userId = useParams().userId;

  //STEP 2
  const { sendRequest } = useHttpClient();

  //data state
  const [userPlaces, setUserPlaces] = useState();

  useEffect(
    () => {
      const fetchUsers = async () => {
        try {
          //this is a GET request so don't need to set HTTP method or headers
          const responseData = await sendRequest(
            `http://localhost:3001/api/places/user/${userId}`
          );
          setUserPlaces(responseData.places);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchUsers();
    },
    [sendRequest] //specific sendrequest as a depedency, this is a depedent of useEffect
  );

  return <PlaceList items={userPlaces} />;
};

export default UserPlaces;
