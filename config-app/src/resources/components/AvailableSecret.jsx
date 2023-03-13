import React from 'react';

import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

const AvailableSecret = props => {
    const addSecretHandler = () => {
        props.addSecret(props.id, formState.inputs.appSecretName.value, formState.inputs.groupPrefix.value);
    };

    const [formState, inputHandler] = useForm({
        id: {
            value: props.id,
            isValid: true
        },
        appSecretName: {
            value: props.appSecretName,
            isValid: true
        },
        groupPrefix : {
            value: props.groupPrefix,
            isValid: true
        }
    }, true);

    return (
        <React.Fragment>
            <div>{props.name}</div>
            <Input 
                id="appSecretName"
                element="input"
                type="text"
                label="Secret Name"
                validators={[]}
                onInput={inputHandler}
                value={props.appSecretName}
            />
            <Input 
                id="groupPrefix"
                element="input"
                type="text"
                label="Group Prefix"
                validators={[]}
                onInput={inputHandler}
                value={props.groupPrefix}
            />
            <div>
                <Button id={props.id} onClick={addSecretHandler}>Add</Button>
            </div>
        </React.Fragment>
    );
};

export default AvailableSecret;