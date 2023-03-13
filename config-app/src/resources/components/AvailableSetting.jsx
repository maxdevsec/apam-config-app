import React from "react";

import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

const AvailableSetting = props => {
    const addSettingHandler = () => {
        props.addSetting(props.id, formState.inputs.appSettingName.value, formState.inputs.groupPrefix.value);
    };

    const [formState, inputHandler] = useForm({
        id: {
            value: props.id,
            isValid: true
        },
        appSettingName : {
            value: props.appSettingName,
            isValid: true
        },
        groupPrefix : {
            value: props.groupPrefix,
            isValid: true
        }
    }, true);

    return (
        <React.Fragment>
            <div>
                <div>{props.name}</div>
                <Input 
                    id="appSettingName"
                    element="input"
                    type="text"
                    label="Setting Name"
                    validators={[]}
                    onInput={inputHandler}
                    value={props.appSettingName}
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
                <Button id={props.id} onClick={addSettingHandler}>Add</Button>
            </div>
            </div>
        </React.Fragment>
    );
}

export default AvailableSetting;