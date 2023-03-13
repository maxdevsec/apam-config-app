import React from 'react';

import Card from '../UIElements/Card';

const EnvironmentValue = props => {

    return (
        <Card>
            <li>
                <div>{props.environment}</div>
                <div>{props.value}</div>
            </li>
        </Card>
    );
};


export default EnvironmentValue;