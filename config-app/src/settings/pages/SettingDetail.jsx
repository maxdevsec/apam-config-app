import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import SettingHeader from "../components/SettingHeader";
import SettingValueList from "../components/SettingValueList";
import config from '../../config';

const SettingDetail = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSetting, setLoadedSetting] = useState();
  const settingId = useParams().settingId;

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const responseData = await sendRequest(
          `${config.baseQueryApiUrl}/settings/${settingId}`
        );
        setLoadedSetting(responseData);
      } catch (err) {}
    };
    fetchSetting();
  }, [sendRequest, settingId]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedSetting) {
    return (
      <div className="center">
        <Card>
          <h2>Setting Not Found</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card>
        <SettingHeader
          name={loadedSetting.name}
          typeName={loadedSetting.typeName}
        />
        <SettingValueList values={loadedSetting.values} />
        <div className='setting-item__actions'>
            <Button to={`/settings`}>Settings</Button>
            <Button to={`/settings/value/${loadedSetting.settingId}`}>Add Value</Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default SettingDetail;
