
import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import AvailableSecrets from '../components/AvailableSecrets';
import SelectedSecret from '../components/SelectedSecret';
import SecretSearchCriteria from '../../secrets/components/SecretSearchCriteria';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import config from '../../config';

const AddSecret = () => {
    const resourceId = useParams().resourceId;
    const navigate = useNavigate();
    const [loadedSecrets, setLoadedSecrets] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [selectedSecrets, setSelectedSecrets] = useState([])

    const searchSecretsHandler = async (name, searchType) => {
        try {
            const responseData = await sendRequest(`${config.baseQueryApiUrl}/resources/${resourceId}/availableSecrets`,
            'POST',
            JSON.stringify({
                name: name,
                searchType: searchType
            }), {
                'Content-Type' : 'application/json'
            });
            setLoadedSecrets(responseData.secrets);
        } catch(error) {}
        
    }

    const addSecretHandler = (secretId, secretName, groupPrefix) => {
        const currentSecrets = [...selectedSecrets];
        currentSecrets.push({"secretId": secretId, "secretName": secretName, "groupPrefix": groupPrefix});
        setSelectedSecrets(currentSecrets);
        
    };

    const saveSecretsHandler = async () => {
        try {
            await sendRequest(`${config.baseManagementApiUrl}/resources/${resourceId}/secrets`,
            'POST',
            JSON.stringify({
                'resourceId': resourceId,
                'secrets' : selectedSecrets
            }),
            {
                'Content-Type': 'application/json'
            });
            navigate('/resources');
        }catch (err) {}
    };

    return(
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <div>
            <SecretSearchCriteria searchHandler={searchSecretsHandler} />
        </div>
        {isLoading && (
            <div className='center'>
                <LoadingSpinner />
            </div>
        )}
        {!isLoading && loadedSecrets && 
            <AvailableSecrets available={loadedSecrets} addSecret={addSecretHandler} />
        }
        {
            selectedSecrets.map((selectedSecret) => (
                <SelectedSecret id={selectedSecret.secretId} key={selectedSecret.secretId} />
            ))
        }
        <Button onClick={saveSecretsHandler}>Add Secrets</Button>
      </React.Fragment>
    );
};

export default AddSecret;