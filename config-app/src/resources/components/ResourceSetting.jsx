import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './ResourceSetting.css';

const ResourceSetting = props => {

    return(
        <li>
            <Card >
                <div><strong>{props.settingName}</strong></div>
                <div>
                {
                    (props.groupPrefix && props.groupPrefix.length > 0) && props.groupPrefix
                }:{props.name}
                </div>
            </Card>
        </li>
        
    );
}


export default ResourceSetting;