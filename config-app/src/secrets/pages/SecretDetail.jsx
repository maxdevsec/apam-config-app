import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import SecretHeader from "../components/SecretHeader";
import SecretValueList from '../components/SecretValueList';
import config from '../../config';

const SecretDetail = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedSecret, setLoadedSecret] = useState();
    const secretId = useParams().secretId;

    useEffect(() => {
        const fetchSecret = async () => {
          try {
            const responseData = await sendRequest(
              `${config.baseQueryApiUrl}/secrets/${secretId}`
            );
            setLoadedSecret(responseData);
          } catch (err) {}
        };
        fetchSecret();
      }, [sendRequest, secretId]);
    
      if (isLoading) {
        return (
          <div className="center">
            <LoadingSpinner />
          </div>
        );
      }
    
      if (!loadedSecret) {
        return (
          <div className="center">
            <Card>
              <h2>Secret Not Found</h2>
            </Card>
          </div>
        );
      }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Card>
                <SecretHeader 
                    name={loadedSecret.name}
                />
                <SecretValueList secretId={secretId} values={loadedSecret.values} />
              <div className='secret-item__actions'>
                   <Button to={'/secrets'}>Secrets</Button>
                   <Button to={`/secrets/value/${loadedSecret.secretId}`}>Add Value</Button>
              </div>
            </Card>
        </React.Fragment>
    );
};

export default SecretDetail;

