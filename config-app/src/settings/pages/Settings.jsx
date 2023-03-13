import React, {useState} from 'react';

import SettingSearchCriteria from '../components/SettingSearchCriteria';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import config from '../../config';
import SettingList from '../components/SettingList';

import './Settings.css';

const Settings = () => {
    const {isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedSettings, setLoadedSettings] = useState();

    const searchSettingsHandler = async (name, value, searchType) => {
        try {
            const responseData = await sendRequest(`${config.baseQueryApiUrl}/settings/search`,
                'POST',
                JSON.stringify({
                    name: name,
                    value: value,
                    searchType: searchType
                }), {
                    'Content-Type': 'application/json'
                });
            setLoadedSettings(responseData.settings);
            
        } catch(error) {

        }
    } 

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className='new-button'>
                <Button to='create'>New Setting</Button>
            </div>
            <Card>
                <SettingSearchCriteria searchHandler={searchSettingsHandler} />
            </Card>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedSettings && 
                <SettingList items={loadedSettings}/>
            }
        </React.Fragment>
    )
}

export default Settings;