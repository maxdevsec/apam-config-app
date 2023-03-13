
import React, {useEffect, useState } from 'react';

import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import ErrorModal from '../UIElements/ErrorModal';
import Card from '../UIElements/Card';
import SettingResourceList from './SettingResourceList';

import config from '../../../config';

const WhereUsed = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedResources, setLoadedResources] = useState();
    const id = props.id;
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const responseData = await sendRequest(`${config.baseQueryApiUrl}/${props.type}s/${id}/resources`);
                setLoadedResources(responseData);
            } catch(err) {}
        }
        fetchResources();
    }, [sendRequest, id, props.type, setLoadedResources]);

    if(isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        )
    }

    if(!loadedResources || !loadedResources.resources || loadedResources.resources.length === 0) {
        return <div className='center'>
            <Card>
                <h2>{props.type} is not used</h2>
            </Card>
        </div>
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <SettingResourceList resources={loadedResources.resources} />
        </React.Fragment>
    )
};

export default WhereUsed;