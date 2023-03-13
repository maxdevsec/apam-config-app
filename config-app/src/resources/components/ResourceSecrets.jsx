import React, {useState, useEffect} from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ResourceSecret from './ResourceSecret';
import config from '../../config';

import "./ResourceSetting.css";



const ResourceSecrets = props => {
    const [loadedSecrets, setLoadedSecrets] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    
    useEffect(() => {
        const fetchSettings = async()=> {
            try {
                const resourceSecretsData = await sendRequest(`${config.baseQueryApiUrl}/resources/${props.resourceId}/secrets`);
                
                setLoadedSecrets({ resourceSecrets: resourceSecretsData.secrets});
            } catch(err) {}
        }
        fetchSettings();

    }, [props.resourceId, sendRequest]);




    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedSecrets && loadedSecrets.resourceSecrets &&
                <Card>
                    <ul className="setting-list">          
                        {loadedSecrets.resourceSecrets.map((secret)=> (
                            <ResourceSecret
                                key={secret.secretId}
                                secretId={secret.secretId}
                                name={secret.name}
                                secretName={secret.secretName}
                                groupPrefix={secret.groupPrefix}
                           />
                        ))}
                    </ul>
                    <div className="setting-item-actions">
                    <Button to={`/resources/${props.resourceId}/secrets`}>Add Secrets</Button>
                    </div>
                </Card>
            }
        </React.Fragment>
    );

}

export default ResourceSecrets;