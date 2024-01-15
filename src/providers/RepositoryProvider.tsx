import React, { useState } from 'react';
import { gitHubConfig } from '@/lib/repository/gitHubRepository';

export type RepositoryContextType = {
    repository: string;
    setRepository: React.Dispatch<React.SetStateAction<string>>;
};

export const RepositoryContext = React.createContext<
    RepositoryContextType | undefined
>(undefined);

export default function RepositoryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [repository, setRepository] = useState<string>(
        gitHubConfig.content_repository
    );

    return (
        <RepositoryContext.Provider
            value={
                {
                    repository,
                    setRepository,
                } as RepositoryContextType
            }
        >
            {children}
        </RepositoryContext.Provider>
    );
}
