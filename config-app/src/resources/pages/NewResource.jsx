import React from 'react';
import { useNavigate } from "react-router-dom";

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import config from '../../config';

import './ResourceForm.css';


const NewResource = () => {

    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const resourceSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`${config.baseManagementApiUrl}/resources`,
            'POST',
            JSON.stringify({
                name: formState.inputs.name.value,
                description: formState.inputs.description.value,
                typeName: formState.inputs.type.value
            }),
            {
                'Content-Type': 'application/json'
            })
        } catch(err) {

        }
        navigate("/resources");
    };
    
    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            type: {
                value: '',
                isValid: false
            }
        }, false
    );
    
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='resource-form' onSubmit={resourceSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input 
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput = {inputHandler}
                    errorText="Please enter a resource name"
                />
                <Input 
                    id="description"
                    element="input"
                    type="text"
                    label="Description"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Please enter a description"
                />
                <Input 
                    id="type"
                    element="input"
                    type="text"
                    label="Type"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Please enter a resoure type"
                />
                <Button type="submit" disabled={!formState.isValid} >Add Resource</Button>
            </form>
        </React.Fragment>
    );
};

export default NewResource;