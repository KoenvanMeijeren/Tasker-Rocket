import React from 'react';
import { RepositoryContext } from '@/providers/RepositoryProvider';

export const useRepositoryContext = () => {
    const context = React.useContext(RepositoryContext);
    if (!context) {
        throw new Error(
            'useRepository must be used within a RepositoryProvider'
        );
    }

    return {
        context,
        repository: context.repository,
        isPrivate: context.isPrivate,
    };
};
