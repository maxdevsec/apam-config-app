import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ResourceSetting from "./ResourceSetting";
import config from '../../config';

import "./ResourceSetting.css";


const ResourceSettings = (props) => {
  const [loadedSettings, setLoadedSettings] = useState({resourceSettings: null, availableSettings: null});
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const resourceSettingsData = await sendRequest(
          `${config.baseQueryApiUrl}/resources/${props.resourceId}/settings`
        );
        setLoadedSettings({ resourceSettings : resourceSettingsData.settings});
      } catch (err) {}
    };
    fetchSettings();
  }, [props.resourceId, sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedSettings && loadedSettings.resourceSettings && (
        <Card>
          <ul className="setting-list">
            {loadedSettings.resourceSettings.map((setting) => (
              <ResourceSetting
                key={setting.settingId}
                settingId={setting.settingId}
                settingName={setting.settingName}
                typeName={setting.typeName}
                name={setting.name}
                groupPrefix={setting.groupPrefix}
              />
            ))}
          </ul>
          <div className="setting-item_actions">
            <Button to={`/resources/${props.resourceId}/settings`}>Add Settings</Button>
          </div>
        </Card>
      )}
    </React.Fragment>
  );
};

export default ResourceSettings;
