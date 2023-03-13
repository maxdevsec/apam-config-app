import React from "react";

import Setting from "./Setting";

import "./SettingList.css";

const SettingList = (props) => {

  return (
    <React.Fragment>
      <ul className="setting-list">
        {props.items.map((setting) => (
          <Setting
            id={setting.settingId}
            key={setting.settingId}
            name={setting.name}
            typeName={setting.typeName}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default SettingList;
