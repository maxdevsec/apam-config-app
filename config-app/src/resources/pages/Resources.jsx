import React, {useState, useEffect} from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ResourceList from '../components/ResourceList';
import config from '../../config';

const Resources = () =>   {
    const [loadedResources, setLoadedResources] = useState();
    const {isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchResources = async() => {
            try {
                const responseData = await sendRequest(`${config.baseQueryApiUrl}/resources`);
                setLoadedResources(responseData.resources);
            } catch(err) {}
        }
        fetchResources();
    }, [sendRequest]);

    return (
        
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedResources && 
                <ResourceList items={loadedResources} />
            }
            
        </React.Fragment>
    );
};

export default Resources;