import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '@/lib/supabase/db';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout';
import { Card, CardBody } from '@chakra-ui/card';
import { BiSolidErrorAlt } from 'react-icons/bi';
// eslint-disable-next-line @typescript-eslint/naming-convention
import Link from 'next/link';
import { IoArrowUndo } from 'react-icons/io5';
import { Button } from '@chakra-ui/react';
import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { MdHome } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { ImWondering2 } from 'react-icons/im';

interface InviteData {
    group_id: string;
    signature: string;
    groups: {
        name: string;
    };
}

interface UserData {
    user_id: string;
    first_name: string;
    last_name: string;
    users_groups: {
        group_id: string;
    }[];
}

async function addToGroup(group_id: string) {
    const { error } = await supabase.rpc('add_participant_to_group', {
        groupid: group_id,
    });

    if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

export default function InvitePage() {
    const [inviteData, setInviteData] = useState<InviteData>();
    const [userData, setUserData] = useState<UserData>();

    const router = useRouter();

    useEffect(() => {
        const fetchInviteData = async () => {
            if (!router.query.invite) return;
            const invite = router.query.invite.toString().split('&');
            const group_id = invite[0];
            const signature = invite[1];
            try {
                // Fetch data from Supabase
                const { data, error } = await supabase
                    .from('invitations')
                    .select('group_id, signature, groups(name)')
                    .eq('group_id', group_id)
                    .eq('signature', signature)
                    .single();
                if (error) {
                    throw new Error(error.message);
                }

                // Handle the fetched data
                setInviteData(data);
            } catch (error) {
                //eslint-disable-next-line no-console
                console.error(error);
            }
        };
        const fetchUserData = async () => {
            try {
                // Fetch data from Supabase
                const { data, error } = await supabase
                    .from('users')
                    .select(
                        'user_id, first_name, last_name, users_groups(group_id)'
                    )
                    .eq(
                        'user_id',
                        (await supabase.auth.getUser()).data.user?.id
                    )
                    .single();
                if (error) {
                    throw new Error(error.message);
                }

                // Handle the fetched data
                setUserData(data);
            } catch (error) {
                //eslint-disable-next-line no-console
                console.error(error);
            }
        };

        void fetchInviteData();
        void fetchUserData();
    }, [router.query.invite]);

    if (!inviteData) {
        return (
            <Card m={5}>
                <CardBody fontSize="3xl">
                    <Flex>
                        <Box m={1}>
                            <BiSolidErrorAlt size={45} />
                        </Box>
                        <Heading m={3} fontSize="2xl">
                            There was no link found with this id and signature
                        </Heading>
                    </Flex>
                    <Divider />
                    <Link href="/groups">
                        <Button
                            my={3}
                            rightIcon={<IoArrowUndo />}
                            variant="outline"
                        >
                            <Text>Go back to groups overview</Text>
                        </Button>
                    </Link>
                </CardBody>
            </Card>
        );
    }

    if (!userData) {
        return <LoadingIndicator />;
    }

    if (!userData.first_name || !userData.last_name) {
        return (
            <Card m={5}>
                <CardBody>
                    <Heading fontSize="2xl" m={2}>
                        You need to enter a first and last name before being
                        able to enter a group
                    </Heading>
                    <Divider />
                    <Link href="/profile">
                        <Button
                            my={3}
                            py={3}
                            rightIcon={<IoArrowUndo />}
                            variant="outline"
                        >
                            <Heading m={1}>Profile page</Heading>
                        </Button>
                    </Link>
                </CardBody>
            </Card>
        );
    }

    let isAlreadyInGroup = false;
    userData.users_groups.forEach((user_group) => {
        if (user_group.group_id === inviteData.group_id) {
            isAlreadyInGroup = true;
        }
    });
    if (isAlreadyInGroup) {
        return (
            <Card m={5}>
                <CardBody>
                    <Flex>
                        <ImWondering2 size={45} />
                        <Heading fontSize="2xl" m={2}>
                            hmmm, it seems you are already a member of the
                            group: {inviteData.groups.name}
                        </Heading>
                    </Flex>
                    <Divider />
                    <Box p={3}>
                        <Link href={`/groups/info/${inviteData.group_id}`}>
                            <Button
                                leftIcon={<FaCheck />}
                                m={3}
                                py={8}
                                variant="outline"
                            >
                                View group
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button
                                leftIcon={<MdHome />}
                                m={3}
                                py={8}
                                variant="outline"
                            >
                                Home
                            </Button>
                        </Link>
                    </Box>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card m={5}>
            <CardBody>
                <Heading fontSize="2xl" m={2}>
                    You are about to join the group:
                    {inviteData.groups.name}
                </Heading>
                <Divider />
                <Box p={3}>
                    <Heading fontSize="xl">
                        Do you consent to sharing your data with the group
                        admins in this group?
                    </Heading>
                    <Link href={`/groups/info/${inviteData.group_id}`}>
                        <Button
                            leftIcon={<FaCheck />}
                            m={3}
                            onClick={() => {
                                void addToGroup(inviteData.group_id);
                            }}
                            py={8}
                        >
                            I consent
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button leftIcon={<MdHome />} m={3} py={8}>
                            Home
                        </Button>
                    </Link>
                </Box>
            </CardBody>
        </Card>
    );
}
