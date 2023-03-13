import React from 'react';
import Identifier from './Identifier';
import './SettingResourceList.css';

const SettingResourceList = (props) => {
    return (
        <React.Fragment>
           <ul className='resource-list'>
                {props.resources.map((resource) => (
                    <Identifier 
                        name={resource.name}
                        id={resource.id}
                    />
                ))}
           </ul>
        </React.Fragment>
    );
};

export default SettingResourceList;