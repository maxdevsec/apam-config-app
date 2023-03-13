import React from "react";

import AvailableSetting from "./AvailableSetting";

const AvailableSettings = props => {
    return (
        <React.Fragment>
            <div>
                {props.available.map((setting) => (
                    <AvailableSetting
                        id={setting.settingId}
                        key={setting.settingId}
                        name={setting.name}
                        typeName={setting.typeName}
                        appSettingName={setting.name}
                        groupPrefix={setting.groupPrefix}
                        addSetting={props.addSetting}
                    />
                ))}
            </div>
        </React.Fragment>
    );
}


export default AvailableSettings;