import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../authConfig";
import Button from '../FormElements/Button';

function handleLogin(instance) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}


export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <Button onClick={() => handleLogin(instance)}>Sign in</Button>
    );
}