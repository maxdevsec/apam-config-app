import React from 'react';

import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';

import './SettingSearchCriteria.css';

const SettingSearchCriteria = (props) => {
    
    const searchSubmitHandler = event => {
        event.preventDefault();
        props.searchHandler(formState.inputs.name.value, formState.inputs.value.value, formState.inputs.searchType.value);
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
            },
            value: {
                value: '',
                isValid: true
            }
        }, true
    );
    return(
        <React.Fragment>
            <form className='search-criteria' onSubmit={searchSubmitHandler}>
                <Input 
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_MAXLENGTH(100)]}
                    onInput={inputHandler}
                    errorText="Name must be less than 100 characters"
                />
                <Input 
                    id="value"
                    element="input"
                    type="text"
                    label="Value"
                    validators={[VALIDATOR_MINLENGTH(0), VALIDATOR_MAXLENGTH(150)]}
                    onInput={inputHandler}
                    errorText="Value must be less than 150 characters"
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
    );
};

export default SettingSearchCriteria;