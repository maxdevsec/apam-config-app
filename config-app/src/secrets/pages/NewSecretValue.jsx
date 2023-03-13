import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import config from '../../config';

import './SecretForm.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const NewSecretvalue = props => {

    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    const secretId = useParams().secretId;

    const submitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`${config.baseManagementApiUrl}/secrets/${secretId}/value`,
            'POST', 
            JSON.stringify({
                environmentName: formState.inputs.environmentName.value,
                value: formState.inputs.value.value
            }),
            {
                'Content-Type': 'application/json'
            })
        } catch(error) {}
        navigate(`/secrets/${secretId}`)
    };

    
    const [formState, inputHandler] = useForm(
        {
            environmentName: {
                value: '',
                isValid: false
            },
            value: {
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
                id="environmentName"
                element="input"
                type="text"
                label="Environment"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter an environment"
            />
            <Input 
                id="value"
                element="input"
                type="text"
                label="Value"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a setting value"
            />
            <Button type="submit" disabled={!formState.isValid}>Add Value</Button>
        </form>
    </React.Fragment>
    );
};


export default NewSecretvalue;