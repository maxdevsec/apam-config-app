import React from 'react';

import EnvironmentValue from '../../shared/components/FormElements/EnvironmentValue';

const SettingValueList = props => {

    return (
        <ul>
            {props.values.map((settingValue)=> (
             <EnvironmentValue
                id={settingValue.settingValueId}
                key={settingValue.settingValueId}
                value={settingValue.value}
                environment={settingValue.environmentName}
             />     
            ))} 
        </ul>
    );
};

export default SettingValueList;