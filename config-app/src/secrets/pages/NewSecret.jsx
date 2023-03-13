import React from 'react';
import {useNavigate } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import config from '../../config';

import './SecretForm.css';

const NewSecret = () => {
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError} = useHttpClient();

    const submitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`${config.baseManagementApiUrl}/secrets`,
                'POST',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    values: []
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
        }  catch(error) {

        }
        navigate("/secrets");
    };

    const [formState, inputHandler]  = useForm(
        {
            name: {
                value: '',
                isValid: false
            }
        }, false
    );

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='secret-form' onSubmit={submitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input 
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Please enter a secret name"
                />
                <Button type="submit" disabled={!formState.isValid}>Add Secret</Button>
            </form>
        </React.Fragment>
    );
};

export default NewSecret;