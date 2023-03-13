import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import EnvironmentValue from '../../shared/components/FormElements/EnvironmentValue';

const SecretValueList = props => {
    return (
        <ul>
        {props.values.map((secretValue)=> (
            <>
         <EnvironmentValue
            id={secretValue.secretValueId}
            key={secretValue.secretValueId}
            value={secretValue.value}
            environment={secretValue.environmentName}
         />
         <Button to={`/secrets/${props.secretId}/value/${secretValue.secretValueId}`}>Edit</Button>
         </>
        ))} 
    </ul>
    );
};

export default SecretValueList;

