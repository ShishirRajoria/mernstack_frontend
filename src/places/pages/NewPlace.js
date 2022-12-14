import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components//FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER_ONLY,
} from "../../shared/components/util/validators";
import useForm from "../../shared/components/hooks/form-hook";
import useHttpClient from "../../shared/components/hooks/http-hook";
import styled from "./PlaceForm.module.css";
import { AuthContext } from "../../shared/components/context/auth-context";

const NewPlace = () => {
  const { isLoading, clearError, sendRequest, error } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      longitude: {
        value: "",
        isValid: false,
      },
      latitude: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  // console.log(formState);

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title',formState.inputs.title.value)
      formData.append('address',formState.inputs.address.value)
      formData.append('description',formState.inputs.description.value)
      formData.append('latitude',formState.inputs.latitude.value)
      formData.append('longitude',formState.inputs.longitude.value)
      formData.append('image',formState.inputs.image.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places",
        "POST",
        formData,
        {
          Authorization: 'Bearer ' + authCtx.token
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className={styled.placeform} onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Input
          id="latitude"
          element="input"
          label="Coordinates_Latitude"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER_ONLY()]}
          errorText="Please enter a valid Latitude."
          onInput={inputHandler}
        />
        <Input
          id="longitude"
          element="input"
          label="Coordinates_Longitude"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER_ONLY()]}
          errorText="Please enter a valid Longiitude"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please Provide an Image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
