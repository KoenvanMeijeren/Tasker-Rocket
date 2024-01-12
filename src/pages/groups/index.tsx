/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import supabase from '@/lib/supabase/db';
import { Card, CardBody } from '@chakra-ui/card';
import { Divider, Flex, Heading, Spacer, Text } from '@chakra-ui/layout';
// eslint-disable-next-line @typescript-eslint/naming-convention
import Link from 'next/link';
import { useModeColors } from '@/hooks/useModeColors';
import { FaChevronDown, FaChevronUp, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { createNewGroup } from '@/lib/groups/groupHandler';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/react';
import { useCustomToast } from '@/lib/utility/toast';
import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ImExit } from 'react-icons/im';

export default function Index() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [filterData, setFilterData] = React.useState<any[]>([]); // Provide proper type for data state
    const { backgroundColorSecondary } = useModeColors();
    const { isOpen, onOpen: onOpen, onClose } = useDisclosure();
    const [groupName, setGroupName] = useState('');
    const [groupDescription, SetGroupDescription] = useState('');
    const customToast = useCustomToast();

    const [order, setOrder] = useState('ASC');

    const fetchGroupsData = async () => {
        const { data: groupData, error: groupError } = await supabase
            .from('groups')
            .select('group_id, name, description, users_groups(group_id, role)')
            .order('name', { ascending: true });
        // eslint-disable-next-line no-console
        if (groupError) console.error(groupError); // Remove console statement
        else {
            setFilterData(groupData);
        }
    }

    const deleteGroup = async (groupId: string) => {
        const { error } = await supabase
            .from('groups')
            .delete()
            .eq('group_id', groupId);
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
        void fetchGroupsData();
    };

    const leaveGroup = async (groupId: string) => {
        const { error } = await supabase.rpc('remove_participant_from_group', {
            groupid: groupId,
        });
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
        void fetchGroupsData();
    };

    const handleAddGroup = async () => {
        await createNewGroup(groupName, groupDescription);
        setGroupName('');
        SetGroupDescription('');
        await fetchGroupsData();
        onClose();
    };

    useEffect(() => {
        void fetchGroupsData();
        customToast(
            'When using a link or scanning a QR-code to a group, only scan links that take you to a localhost address',
            '',
            'warning'
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const callHandleSort = () => {
        if (order === 'ASC') {
            const sorted = [...filterData].sort((a, b) => {
                if (typeof a.name === 'string' && typeof b.name === 'string') {
                    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
                }
                return 0;
            });
            setFilterData(sorted);
            setOrder('DSC');
        }
        if (order === 'DSC') {
            const sorted = [...filterData].sort((a, b) => {
                if (typeof a.name === 'string' && typeof b.name === 'string') {
                    return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
                }
                return 0;
            });
            setFilterData(sorted);
            setOrder('ASC');
        }
    };

    if (!filterData) return <LoadingIndicator />;

    return (
        <>
            <Flex bg={backgroundColorSecondary} p={5}>
                <Heading mt={2} size="md">
                    Sort
                </Heading>
                <Button onClick={callHandleSort} p={0}>
                    {order === 'ASC' ? <FaChevronDown /> : <FaChevronUp />}
                </Button>
                <Spacer />
                <Heading mt={2} size="md">
                    Create new
                </Heading>
                <Button onClick={onOpen} p={0}>
                    <FaPlus />
                </Button>
            </Flex>
            {filterData.map(
                (
                    group: {
                        group_id: string;
                        name: string;
                        description: string;
                    } // Provide explicit types for group object properties
                ) => (
                    <Card
                        _hover={{
                            shadow: 'xl',
                            transitionDuration: '0.4s',
                            transitionTimingFunction: 'ease-in-out',
                        }}
                        key={group.group_id}
                        m={5}
                    >
                        <Flex>
                            <CardBody>
                                <Link href={'/groups/info/' + group.group_id}>
                                    <Flex>
                                        <Heading
                                            fontSize="2xl"
                                            size="md"
                                            wordBreak="break-word"
                                        >
                                            {group.name}
                                        </Heading>
                                        <Spacer />
                                        {/* <Text>Role: {group.role}</Text> */}
                                    </Flex>
                                    <Divider py={2} />
                                    <Text>{group.description}</Text>
                                </Link>
                            </CardBody>
                            {group.role === 'group_admin' ? (
                                <Tooltip label="Delete this group">
                                    <Button
                                        mt={8}
                                        mx={3}
                                        onClick={() => {
                                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                            deleteGroup(group.group_id);
                                        }}
                                    >
                                        <FaTrashAlt />
                                    </Button>
                                </Tooltip>
                            ) : null}
                            <Tooltip label="Leave this group">
                                <Button
                                    mt={8}
                                    mx={3}
                                    onClick={() => {
                                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                        leaveGroup(group.group_id);
                                    }}
                                >
                                    <ImExit />
                                </Button>
                            </Tooltip>
                        </Flex>
                    </Card>
                )
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a new group</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            maxLength={64}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Group name"
                            value={groupName}
                        />
                        <Input
                            maxLength={128}
                            mt={3}
                            onChange={(e) =>
                                SetGroupDescription(e.target.value)
                            }
                            placeholder="Group description"
                            value={groupDescription}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            onClick={() => {
                                onClose();
                                setGroupName('');
                                SetGroupDescription('');
                            }}
                            variant="ghost"
                        >
                            Close
                        </Button>
                        <Button
                            colorScheme="green"
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                handleAddGroup();
                            }}
                            variant="ghost"
                        >
                            Create group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
