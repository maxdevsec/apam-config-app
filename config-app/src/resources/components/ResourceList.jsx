import React from "react";
import Button from "../../shared/components/FormElements/Button";

import Resource from "./Resource";

import "./ResourceList.css";

const ResourceList = (props) => {
  return (
    <React.Fragment>
      <div>
        <Button to='create'>New Resource</Button>
      </div>
      <ul className="resource-list">
        {props.items.map((resource) => (
            <Resource
                  key={resource.resourceId}
                  id={resource.resourceId}
                  name={resource.name}
                  description={resource.description}
                  type={resource.type}
                  image={resource.image}
                />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ResourceList;
