import React, {useContext} from 'react';
import { useEffect } from 'react';

import Button from "../../shared/components/FormElements/Button";
import Secret from "./Secret";
import useSecretsApi from "../../shared/hooks/useSecretsApi";
import { SecretFilterContext } from '../../contexts/SecretFilterContext';
import "./SecretList.css";


const SecretList = () => {

    const {
        loadedSecrets: secrets,
        search,
    } = useSecretsApi();

    const {
        searchQuery
    } = useContext(SecretFilterContext);

    const searchCompleted = () => {
        console.log("Search completed");
    }
    useEffect(() => {
        const searchSecrets = async() => {
            try {
                await search(searchQuery, searchCompleted);
            } catch(err) {}
        }
        searchSecrets();
    }, [searchQuery]);

    return (
        <React.Fragment>
        <div class='new-button'>
            <Button to='create'>New Secret</Button>
        </div>
        <ul className="secret-list">
            {[secrets.map(secret => 
                <Secret
                    key={secret.secretId}
                    id={secret.secretId}
                    name={secret.name}
                    >

                </Secret>)]}
        </ul>
        </React.Fragment>
    );
};

export default SecretList;