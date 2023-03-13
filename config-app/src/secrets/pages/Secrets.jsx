import React, { useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import SecretList from '../components/SecretList';
import config from '../../config';
import SecretsToolbar from '../components/SecretsToolbar';
import { SecretFilterProvider } from '../../contexts/SecretFilterContext';

const Secrets = () => {
    const [loadedSecrets, setLoadedSecrets] = useState();
    const {isLoading, error, sendRequest, clearError } = useHttpClient();

    const searchSecretsHandler = async (name, searchType) => {
        try {
            const responseData = await sendRequest(`${config.baseQueryApiUrl}/secrets/search`,
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
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <SecretFilterProvider>
                <SecretsToolbar />
                <SecretList  items={[]} />
            </SecretFilterProvider>
        </React.Fragment>
        
    );
    
};

export default Secrets;