import Heading from '@/components/textStyles/Heading';
import supabase from '@/lib/supabase/db';
import { useCustomToast } from '@/lib/utility/toast';
import { Card, CardBody, Divider, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface groupData {
    name: string;
    description: string;
    members: user[];
}

interface user {
    user_id: string;
    name: string;
    progress: string;
}

export default function GroupInfo() {
    const [groupData, setGroupData] = useState<groupData>();
    const CustomToast = useCustomToast();

    const router = useRouter();
    const { group_id } = router.query;

    // retrieve user data from supabase
    useEffect(() => {
        //TODO: SHOWS ERROR ON RELOAD
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('groups')
                .select()
                .eq('group_id', group_id)
                .single();

            if (error) {
                CustomToast(error.message, error.details, 'error');
            }
            setGroupData(data as groupData | undefined);
        };

        void fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!groupData) {
        return <div>Loading...</div>;
    }

    return (
        <Card m={5}>
            <CardBody>
                <Heading>Name: {groupData?.name} </Heading>
                <Text>Description: {groupData.description}</Text>
                <Divider />

                {/* Map all the users in the group */}
                {/* {groupData.members.map((user) => (
                    <div key={user.user_id}>
                        <Text>User ID: {user.user_id}</Text>
                        <Text>Name: {user.name}</Text>
                        <Text>Progress: {user.progress}</Text>
                        <Divider />
                    </div>
                ))} */}
            </CardBody>
        </Card>
    );
}
