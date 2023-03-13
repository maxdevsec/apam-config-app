import React from 'react';

import './Setting.css';

const SettingHeader = props =>  {
    return (
        <div className='setting-item__content'>
        <div>{props.name}</div>
        <div>{props.typeName}</div>
    </div>
    );
}


export default SettingHeader;