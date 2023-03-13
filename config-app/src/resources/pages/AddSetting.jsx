import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import SettingSearchCriteria from '../../settings/components/SettingSearchCriteria';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import config from '../../config';
import AvailableSettings from '../components/AvailableSettings';
import SelectedSetting from '../components/SelectedSetting';


const AddSetting = () => {
    const resourceId = useParams().resourceId;
    const navigate = useNavigate();
    const {isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedSettings, setLoadedSettings] = useState();
    const [selectedSettings, setSelectedSettings] = useState([])

    const searchSettingsHandler = async (name, value, searchType) => {
        try {
            const responseData = await sendRequest(`${config.baseQueryApiUrl}/resources/${resourceId}/availableSettings`,
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

    const saveSettingsHandler = async () => {
     try {
         await sendRequest(`${config.baseManagementApiUrl}/resources/${resourceId}/settings`,
         'POST',
         JSON.stringify({
             'resourceId': resourceId,
             'settings' : selectedSettings
         }),
         {
             'Content-Type': 'application/json'
         });
         navigate('/resources');
     } catch(err) {}
        
   };

   const addSettingHandler = (settingId, settingName, groupPrefix) => {
    const currentSettings = [...selectedSettings];
    currentSettings.push({ "settingId": settingId, "settingName" : settingName, "groupPrefix": groupPrefix });
    setSelectedSettings(currentSettings);
  };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div>
            <SettingSearchCriteria searchHandler={searchSettingsHandler} />
            </div>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedSettings && 
               <AvailableSettings available={loadedSettings} addSetting={addSettingHandler}/>
            }
                    {
              selectedSettings.map((selectedSetting) => (
                 <SelectedSetting id={selectedSetting.settingId} key={selectedSetting.settingId}/>
              ))
            } 
            <Button onClick={saveSettingsHandler}>Add Settings</Button>
        </React.Fragment>
        
    );
};

export default AddSetting;