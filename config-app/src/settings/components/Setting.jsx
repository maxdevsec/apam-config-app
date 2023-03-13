import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import SettingHeader from './SettingHeader';
import Button from '../../shared/components/FormElements/Button';

import './Setting.css';

const Setting = props =>  {

    return (
        <li className="setting-item">
            <Card>
                <SettingHeader 
                    name={props.name}
                    typeName={props.typeName}
                />
                <div className='setting-item__actions'>
                    <Button to={`/settings/edit/${props.id}`}>Edit</Button>
                    <Button to={`/settings/${props.id}`}>View</Button>
                    <Button to={`/settings/${props.id}/resources`}>Usage</Button>
                </div>
            </Card>
        </li>
    );
};

export default Setting;