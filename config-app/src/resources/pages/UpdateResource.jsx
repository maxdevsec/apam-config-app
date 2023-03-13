import React, { useEffect, useState} from "react";

import { useNavigate, useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from '../../shared/components/UIElements/Card';
import config from '../../config';

import "./ResourceForm.css";

const UpdateResource = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedResource, setLoadedResource] = useState();
  const resourceId = useParams().resourceId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      typeName: {
        value: "",
        isValid: false,
      },
    },
    true);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const responseData = await sendRequest(`${config.baseQueryApiUrl}/resources/${resourceId}`);
                setLoadedResource(responseData);
                setFormData(
                    {
                        name: {
                            value: responseData.name,
                            isValid: true
                        },
                        description: {
                            value: responseData.description,
                            isValid: true
                        },
                        typeName: {
                            value: responseData.typeName,
                            isValid:  true
                        }
                    },
                    true
                );
            } catch(err) {

            }
        };
        fetchResource();
       
    },
    [sendRequest, resourceId, setFormData]);

  if (isLoading) {
      return (
          <div className="center">
              <LoadingSpinner />
          </div>
      )
  }
  if (!loadedResource) {
      return <div className="center">
          <Card>
              <h2>Resource not found</h2>
          </Card>
      </div>
  }
  const submitHandler = async event => {
    event.preventDefault();
    try {
        await sendRequest(`http://localhost:5054/api/resources/${resourceId}`,
        'PUT',
        JSON.stringify({
            'name': formState.inputs.name.value,
            'description': formState.inputs.description.value,
            'typeName': formState.inputs.typeName.value
        }),
        {
            'Content-Type': 'application/json'
        });
        navigate('/resources');
    } catch (err) {}
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="resource-form" onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          value={loadedResource.name}
          errorText="Please enter a resource name"
          valid={true}
        />
        <Input
          id="description"
          element="input"
          type="text"
          label="Description"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          value={loadedResource.description}
          errorText="Please enter a description"
          valid={true}
        />
        <Input
          id="type"
          element="input"
          type="text"
          label="Type"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          value={loadedResource.typeName}
          errorText="Please enter a resoure type"
          valid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Save
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdateResource;
