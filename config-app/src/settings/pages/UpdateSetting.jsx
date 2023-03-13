import React, { useEffect, useState} from "react";

import { useNavigate, useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import config from '../../config';
import Card from '../../shared/components/UIElements/Card';

import "./SettingForm.css";


const UpdateSetting = () => {
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedSetting, setLoadedSetting] = useState();
    const settingId = useParams().settingId;

    const [formState, inputHandler, setFormData]  = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            typeName: {
                value: '',
                isValid: false
            }
        }, true
    );

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const responseData = await sendRequest(`${config.baseQueryApiUrl}/settings/${settingId}`);
                setLoadedSetting(responseData);
                setFormData( {
                    name: {
                        value: responseData.name,
                        isValid: true
                    },
                    typeName: {
                        value: responseData.typeName,
                        isValid: true
                    }
                }, true);
            } catch(err) {

            }
        };
        fetchSetting();
    },
    [sendRequest, settingId, setFormData]);

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        )
    }

    if(!loadedSetting) {
        return <div className="center">
            <Card>
                <h2>Setting Not Found</h2>
            </Card>
        </div>
    }

    const submitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`${config.baseManagementApiUrl}/settings/${settingId}`,
            'PUT',
            JSON.stringify({
                'name': formState.inputs.name.value,
                'typeName': formState.inputs.typeName.value
            }),
            {
                'Content-Type': 'application/json'
            }
            );
            navigate('/settings');
        } catch(err) {}
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='setting-form' onSubmit={submitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input 
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput  = {inputHandler}
                    value = {loadedSetting.name}
                    errorText = "Please enter a resource name"
                />
                <Input 
                    id="typeName"
                    element="input"
                    type="text"
                    label="Type"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput = {inputHandler}
                    value = {loadedSetting.typeName}
                    errorText= "Please enter a type"
                />
                <Button type="submit" disabled={!formState.isValid}>Save</Button>
            </form>
        </React.Fragment>
    );
};

export default UpdateSetting;