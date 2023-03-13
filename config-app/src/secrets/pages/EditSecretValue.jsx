
import useSecretsApi from '../../shared/hooks/useSecretsApi';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

const EditSecretValue = () => {
    const navigate = useNavigate();
    const secretValueId = useParams().id;
    const secretId = useParams().secretId;

    const {
        updateValue
    } = useSecretsApi();

    const submitHandler = async event => {
        event.preventDefault();
        try {
            await updateValue(secretValueId, formState.inputs.secretValue.value, saveCompleted);
        } catch (e) {}
        console.log("Submitting");
    }

    const saveCompleted = () => {
        navigate(`/secrets/${secretId}`);
    }

    const [formState, inputHandler] = useForm(
        {
            secretValue: {
                value: '',
                isValid: true
            }
        }, true
    );

    return (
        <form className='secret-form' onSubmit={submitHandler}>
            <div>
            <Input 
                id="secretValue"
                element="input"
                type="text"
                label="New Value"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="A new value is required"
            />
            </div>
            <Button type="submit" disabled={!formState.isValid}>Save</Button>
        </form>
    );
};

export default EditSecretValue;
