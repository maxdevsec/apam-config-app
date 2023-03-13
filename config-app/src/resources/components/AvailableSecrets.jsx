import React from "react";

import AvailableSecret from "./AvailableSecret";

const AvailableSecrets = (props) => {
    return (
        <React.Fragment>
            <div>
                {props.available.map((secret)=> (
                    <AvailableSecret 
                        id={secret.secretId}
                        key={secret.secretId}
                        name={secret.name}
                        appSecretName={secret.name}
                        groupPrefix={secret.groupPrefix}
                        addSecret={props.addSecret}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};

export default AvailableSecrets;
