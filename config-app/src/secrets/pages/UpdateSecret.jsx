import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import config from '../../config';

import './SecretForm.css';

const UpdateSecret = () => {
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedSecret, setLoadedSecret] = useState();
    const secretId = useParams().secretId;

    const [formState, inputHandler, setFormData]  = useForm(
        {
            name: {
                value: '',
                isValid: true
            }
        }, true
    );

    useEffect(() => {
        const fetchSecret = async () => {
            try {
                const responseData = await sendRequest(`${config.baseQueryApiUrl}/secrets/${secretId}`);
                setLoadedSecret(responseData);
                setFormData({
                    name: {
                        value: responseData.name,
                        isValid: true
                    }
                }, true);
            } catch(err) {

            }
        };
        fetchSecret();

    }, [sendRequest, secretId, setFormData]);

    const submitHandler = async event => {
        event.preventDefault();
        // try {
        //     await sendRequest('http://localhost:5054/api/secrets',
        //         'PUT',
        //         JSON.stringify({
        //             name: formState.inputs.name.value,
        //             values: []
        //         }),
        //         {
        //             'Content-Type': 'application/json'
        //         }
        //     )
        // }  catch(error) {

        // }
        navigate("/secrets");
    };

    if(isLoading)     {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        )
    }

    if(!loadedSecret) {
        return <div className='center'>
            <Card>
                <h2>Secret Not Found</h2>
            </Card>
        </div>
    }

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
                    value={loadedSecret.name}
                    errorText="Please enter a secret name"
                />
                <Button type="submit" disabled={!formState.isValid}>Save</Button>
            </form>
        </React.Fragment>
    );
};

export default UpdateSecret;