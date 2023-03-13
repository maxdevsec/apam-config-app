import { useState, useCallback, useRef, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const { instance, accounts } = useMsal();

    const activeHttpRequests = useRef([]);
    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            console.log(accounts[0]);
            const request = {
                //...loginRequest,
                scopes: ["fd98b10b-1d2a-43b3-8a8b-06c002e31819/AccessApi", "fd98b10b-1d2a-43b3-8a8b-06c002e31819/AccessWrite"],
                account: accounts[0]
            };

            
            const tokenResponse = await instance.acquireTokenSilent(request);
            const accessToken = tokenResponse.accessToken;
            headers['Authorization'] = 'Bearer ' + accessToken;
            console.log(accessToken);
            activeHttpRequests.current.push(httpAbortCtrl);
            
            const response = await fetch(url, {
                method: method,
                body: body,
                headers: headers,
                //signal: httpAbortCtrl.signal
            });
    
            const responseData = await response.json();
    
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl =>  reqCtrl !== httpAbortCtrl);

            if (!response.ok) {
                throw new Error(responseData.message || 'An unexpected http request error occurred')
            }
            setIsLoading(false);
            return responseData;
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'An unexpected error occurred')
            throw err;
        }
        
    }, [accounts, instance]);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    },[])

    return {
        isLoading, error, sendRequest, clearError
    }
};