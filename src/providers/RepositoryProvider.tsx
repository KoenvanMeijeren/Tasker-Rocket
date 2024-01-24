import React, { useState } from 'react';
import { EnvOptions, getEnvValue, isEnvValueEnabled } from '@/lib/utility/env';

export type RepositoryContextType = {
    repository: string;
    isPrivate: boolean;
};

export const RepositoryContext = React.createContext<
    RepositoryContextType | undefined
>(undefined);

export default function RepositoryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [repository] = useState<string>(
        getEnvValue(EnvOptions.GithubContentRepository)
    );
    const [isPrivate] = useState<boolean>(
        isEnvValueEnabled(EnvOptions.GithubContentRepository)
    );

    return (
        <RepositoryContext.Provider
            value={{
                repository,
                isPrivate,
            }}
        >
            {children}
        </RepositoryContext.Provider>
    );
}
