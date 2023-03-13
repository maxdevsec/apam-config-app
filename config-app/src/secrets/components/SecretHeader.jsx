import React from 'react';

import './Secret.css';

const SecretHeader = props => {
    return (
        <div className='secret-item__content'>
            <div>{props.name}</div>
        </div>
    );
};

export default SecretHeader;