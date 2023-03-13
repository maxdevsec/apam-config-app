import React from 'react';

import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';

const SecretSearchCriteria = (props) => {

    const searchSubmitHandler = event => {
        event.preventDefault();
        props.searchHandler(formState.inputs.name.value, formState.inputs.searchType.value);
    };

    
    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: true
            },
            searchType: {
                value: 'Contains',
                isValid: true
            }
        }, true
    );

    return (
        <React.Fragment>
        <form onSubmit={searchSubmitHandler}>
            <Input 
                id="name"
                element="input"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Name be specified"
            />
            <Input 
                id="searchType"
                element="input"
                type="text"
                label="Search Type"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value="Contains"
                errorText="A search type must be specified"
            />
            <Button type="submit">Search</Button>
        </form>
        
    </React.Fragment>
    )
};


export default SecretSearchCriteria;