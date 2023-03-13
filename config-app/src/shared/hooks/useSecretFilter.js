
import { useState } from 'react';

const useSecretFilter = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return {
        searchQuery,
        setSearchQuery
    };
}


export default useSecretFilter;