import { createContext } from 'react';

import useSecretFilter from '../shared/hooks/useSecretFilter';

const SecretFilterContext = createContext();

const SecretFilterProvider = ({children}) => {

    const {
        searchQuery,
        setSearchQuery
    } = useSecretFilter();

    return (
        <SecretFilterContext.Provider
            value={{searchQuery, setSearchQuery}}
            >
            {children}
        </SecretFilterContext.Provider>
    )
}

export {SecretFilterContext, SecretFilterProvider};