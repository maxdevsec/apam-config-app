import { useParams } from 'react-router-dom';
import WhereUsed from '../../shared/components/configuration/WhereUsed';

const SettingResources = () => {
    
    const settingId = useParams().settingId;
    return (
        <WhereUsed id={settingId} type='setting' />
    )
}

export default SettingResources;