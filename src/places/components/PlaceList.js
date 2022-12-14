import React from "react";
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import style from "./PlaceList.module.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={`${style.placelist} center `}>
        <Card>
          <h2>No Places found. Maybe Create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    //<ul className={`${style.placelist} center `}>
    <ul className={style.placelist}>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          latitude={place.latitude}
          longitude={place.longitude}
          onDelete={props.onDeletePlace}
        />
      ))}{" "}
    </ul>
  );
};
export default PlaceList;
