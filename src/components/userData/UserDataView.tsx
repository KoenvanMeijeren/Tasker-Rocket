import { useGithubUserData } from '@/lib/repository/gitHubRepository';
import { LoadingIndicator } from '../LoadingIndicator';
import { GitHubUser } from '@/types/gitHubData';
import { Image, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

type Data = {
    user: GitHubUser;
};

export function UserDataView({ userdata }: { userdata: GitHubUser }) {
    const [content, setContent] = useState<Data | null>(null);

    useEffect(() => {
        if (userdata) {
            const newData: Data = { user: userdata };
            setContent(newData);
        }
    }, [userdata]);

    if (!content) {
        return null;
    }

    return (
        <Box alignItems="center" display="flex">
            <p className="text-center m-6">{content.user.login}</p>
            <Image
                alt="Dan Abramov"
                borderRadius="full"
                boxSize="60px"
                src={content.user.avatar_url}
            />
        </Box>
    );
}

export default function UserData() {
    const { data, error, isLoading } = useGithubUserData();

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }

    return <UserDataView userdata={data} />;
}
