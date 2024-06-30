import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Rowan University",
    description: "One of the best Universities in the country!",
    imageUrl: "http://elvis.rowan.edu/~burnse/assets/rowan-campus.jpeg",
    address: "201 Mullica Hill Rd, Glassboro, NJ 08028",
    location: {
      lat: 39.7099689,
      lng: -75.1213872,
    },
    creator: "u1",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

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
            `http://localhost:3001/api/places/user/u1`
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
