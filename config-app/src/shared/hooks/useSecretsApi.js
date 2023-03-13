import { useState, useEffect} from 'react';
import { useHttpClient } from './http-hook';
import config from '../../config';
import {REQUEST_STATUS} from '../util/constants';

const secretsSearch = "secrets/search";

const useSecretsApi = () => {
    const [loadedSecrets, setLoadedSecrets] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");
    const {isLoading, error: apiError, sendRequest, clearError} = useHttpClient();
    
    function search(name, completionCallback) {
        async function delayFunction() {
            try {
                const responseData = await sendRequest(`${config.baseQueryApiUrl}/${secretsSearch}`,
                'POST',
                JSON.stringify({
                    name: name,
                    searchType: "CONTAINS"
                }), {
                    'Content-Type' : 'application/json'
                });
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setLoadedSecrets(responseData.secrets);
            } catch(error) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(error);
            }
            if(completionCallback) {
                completionCallback();
            }
        }
        

        delayFunction();
    }

    function updateValue(id, newValue, completionCallback)
    {
        const endpoint = `${config.baseManagementApiUrl}/secrets/${id}/value`;
        async function delayFunction() {
            try {
                const response = await sendRequest(endpoint, 'PUT', 
                    JSON.stringify({
                        secretValueId: id,
                        newValue: newValue
                    }), {
                        'Content-Type' : 'application/json'
                    });
                    setRequestStatus(REQUEST_STATUS.SUCCESS);
    
            } catch(error) {
                setError(error);
            }
            if(completionCallback){
                completionCallback();
            }
    
        }
        delayFunction();
    }

    return { loadedSecrets, requestStatus, error, search, updateValue}
}

export default useSecretsApi;