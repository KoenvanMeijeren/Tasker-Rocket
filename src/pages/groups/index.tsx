import React, { useEffect, useState } from 'react';
import supabase from '@/lib/supabase/db';
import { Card } from '@chakra-ui/card';
import { Box, Flex, Heading, LinkBox, Spacer, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import { useModeColors } from '@/hooks/useModeColors';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';
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
    useDisclosure,
} from '@chakra-ui/react';
import { useCustomToast } from '@/lib/utility/toast';

export default function Index() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = React.useState<any[]>([]); // Provide proper type for data state
    const [filterData, setFilterData] = React.useState<any[]>([]); // Provide proper type for data state
    const { backgroundColorSecondary } = useModeColors();
    const { isOpen, onOpen: onOpen, onClose } = useDisclosure();
    const [warned, setWarnedStatus] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, SetGroupDescription] = useState('');
    const customToast = useCustomToast();

    const [order, setOrder] = useState('DSC');

    const fetchGroupData = async () => {
        const { data: responseData, error } = await supabase
            .from('groups')
            .select()
            .order('name', { ascending: true }); // Rename variable to avoid conflict
        if (error) console.error(error); // Remove console statement
        else {
            setData(responseData);

            setFilterData(responseData);
        } // Update setData with the renamed variable
    };

    useEffect(() => {
        void fetchGroupData();
        customToast(
            'When using a link or scanning a QR-code to a group, only scan links that take you to a localhost address',
            '',
            'warning'
        );
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

    return (
        <>
            <Flex bg={backgroundColorSecondary} p={5}>
                <Heading size="md" mt={2}>
                    Sort
                </Heading>
                <Button onClick={callHandleSort} p={0}>
                    {order === 'ASC' ? <FaChevronDown /> : <FaChevronUp />}
                </Button>
                <Spacer />
                <Heading size="md" mt={2}>
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
                    <Link
                        href={'/groups/info/' + group.group_id}
                        key={group.group_id}
                    >
                        <Card
                            m={5}
                            p={3}
                            _hover={{
                                shadow: 'xl',
                                transitionDuration: '0.4s',
                                transitionTimingFunction: 'ease-in-out',
                            }}
                        >
                            <Heading size="md" pb={1} wordBreak="break-word">
                                {group.name}
                            </Heading>
                            <Text>{group.description}</Text>
                        </Card>
                    </Link>
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
                                createNewGroup(groupName, groupDescription);
                                setGroupName('');
                                SetGroupDescription('');
                                onClose();
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
