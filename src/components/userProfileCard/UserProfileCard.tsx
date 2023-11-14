import { useGithubUserData } from '@/lib/repository/gitHubRepository';
import { LoadingIndicator } from '../LoadingIndicator';
import { GitHubUser } from '@/types/gitHubData';
import { Image, Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

type Data = {
    user: GitHubUser;
};

export default function UserProfileCard() {
    const { data, error, isLoading } = useGithubUserData();

    const [content, setContent] = useState<Data | null>(null);

    useEffect(() => {
        if (data) {
            const newData: Data = { user: data };
            setContent(newData);
        }
    }, [data]);

    if (!content) {
        return null;
    }

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }

    return (
        <Box alignItems="center" display="flex">
            <Text className="text-center m-6">{content.user.login}</Text>
            <Image
                alt="Dan Abramov"
                borderRadius="full"
                boxSize="52px"
                src={content.user.avatar_url}
            />
        </Box>
    );
}
