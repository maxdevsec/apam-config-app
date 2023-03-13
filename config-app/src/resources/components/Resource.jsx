import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ResourceDetail from "./ResourceDetail";

import  "./Resource.css";

const Resource = (props) => {
  const [showDetail, setShowDetail] = useState(false);

  const showDetailHandler = () => setShowDetail(true);

  const closeDetailHandler = () => setShowDetail(false);
  
  return (
    <React.Fragment>
      <Modal
        show={showDetail}
        onCancel={closeDetailHandler}
        contentClass="styles.resource-item__modal-content"
        footerClass="resource-item__modal-action"
        footer={<Button onClick={closeDetailHandler}>Close</Button>}
      >
        <div className="resource-detail-container">
          <ResourceDetail resourceId={props.id} />
        </div>
      </Modal>
      <li className="resource-item">
        <Card className="resource-item__content">
          <div className="resource-item__image">
            <img src={props.image} alt="resource"/>
          </div>
          <div className="resource-item__info">
            <h2>{props.name}</h2>
            <h3>{props.description}</h3>
            <p>Status</p>
          </div>
          <div className="resource-item__actions">
            <Button inverse onClick={showDetailHandler}>
              Details
            </Button>
            <Button to={`/resources/${props.id}`}>Edit</Button>
            <Button to={`/resources/${props.id}/configuration`}>Configuration</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default Resource;
