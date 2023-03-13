
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

import "./Secret.css";

const Secret = props => {
    return(
        <li className="secret-item">
            <Card className="secret-item__content">
               
               <div className="secret-item__info">
                   <h2>{props.name}</h2>
                   <h3>{props.description}</h3>
                   <p>Current Version</p>
               </div>
               <div className="secret-item__action">
                   <Button to={`/secrets/${props.id}`}>View</Button>
                   <Button to={`/secrets/edit/${props.id}`}>Edit</Button>
                   <Button to={`/secrets/${props.id}/resources`}>Usage</Button>
               </div>
            </Card>
        </li>
    );
};

export default Secret;