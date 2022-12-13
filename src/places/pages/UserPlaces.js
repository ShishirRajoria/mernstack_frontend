import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import useHttpClient from "../../shared/components/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.userPlacesByUserId);
      } catch (err) {}
    };
    
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deltedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deltedPlaceId ))
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
    {!isLoading && loadedPlaces &&  <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
    </>
  );
};
export default UserPlaces;
