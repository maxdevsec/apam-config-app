import React from 'react';
import { useParams } from "react-router-dom";

import ResourceSettings from '../components/ResourceSettings';
import ResourceSecrets from '../components/ResourceSecrets';

const ResoureConfiguration = () => {
    const resourceId = useParams().resourceId;

    return (
        <React.Fragment>
            <ResourceSettings resourceId={resourceId}/>
            <ResourceSecrets resourceId={resourceId}/>
        </React.Fragment>
    );
};

export default ResoureConfiguration;