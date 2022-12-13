import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import "./PlaceItem.css";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useHttpClient from "../../shared/components/hooks/http-hook";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { error, isLoading, clearError, sendRequest } = useHttpClient();

  const authCtx = useContext(AuthContext);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    try {
       await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + authCtx.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map latitude={props.latitude} longitude={props.longitude} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you Sure"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it can
          be undone thereafter
        </p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlays />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {authCtx.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>//i can use Link also
            )}
            {authCtx.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};
export default PlaceItem;