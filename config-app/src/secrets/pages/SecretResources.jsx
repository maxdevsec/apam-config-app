import { useParams } from 'react-router-dom';
import WhereUsed from '../../shared/components/configuration/WhereUsed';

const SecretResources = () => {
    
    const secretId = useParams().secretId;
    return (
        <WhereUsed id={secretId} type='secret' />
    )
}

export default SecretResources;