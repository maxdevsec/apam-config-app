import Card from '../UIElements/Card';

import './Identifier.css';

const Identifier = (props) => {
    return (
        <li>
            <Card>
            {props.name}
            </Card>
        </li>
    );
};

export default Identifier;