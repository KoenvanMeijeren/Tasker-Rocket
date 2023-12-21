import { useCustomToast } from '@/lib/utility/toast';
import { GroupContext } from '@/providers/GroupProvider';
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    useClipboard,
} from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { MdAddLink, MdLink, MdLinkOff } from 'react-icons/md';

export default function InvitePopup() {
    const customToast = useCustomToast();

    const {
        isAddLinkOpen,
        onCloseAddLink,
        groupData,
        deleteInvitation,
        addInvitation,
        onOpenNewLink,
        setExpirationDate,
        date,
        fetchData,
        onCopy,
        value,
        setValue,
        hasCopied,
    } = useContext(GroupContext);

    

    return (
        <Modal isOpen={isAddLinkOpen} onClose={onCloseAddLink}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Invitations</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* //todo: shows outdated information */}
                    {groupData.invitations.map((invitation) => (
                        <Box
                            key={`${invitation.group_id}${invitation.signature}`}
                        >
                            <Divider />
                            <Flex my={2}>
                                <Button
                                    onClick={() => {
                                        setValue(
                                            `localhost:3000/groups/add/${invitation.group_id}&${invitation.signature}`
                                        );
                                        onCopy();
                                        customToast(
                                            'Copied!',
                                            'Link copied to clipboard',
                                            'success'
                                        );
                                    }}
                                >
                                    <MdLink size={30} />
                                </Button>
                                <Heading m={1} fontSize="xl">
                                    Invitation
                                </Heading>
                                <Text ml={2}>
                                    Created at:{' '}
                                    {invitation.created_at.split('T')[0]}
                                    <br />
                                    {
                                        invitation.created_at
                                            .split('T')[1]
                                            .split('.')[0]
                                    }
                                </Text>
                                <Text ml={2}>
                                    Expires at: {invitation.expires_at}
                                </Text>
                                <Spacer />
                                <Button
                                    onClick={() => {
                                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                        deleteInvitation(invitation);
                                    }}
                                    _hover={{
                                        backgroundColor: 'red',
                                    }}
                                >
                                    <MdLinkOff size={30} />
                                </Button>
                            </Flex>
                        </Box>
                    ))}
                </ModalBody>

                <Box m={6}>
                    <Divider mb={2} />
                    <Heading fontSize="xl">Create new invitation</Heading>
                    <Text>Expires at:</Text>

                    <Flex>
                        <Input
                            type="date"
                            value={date}
                            onChange={(d) => setExpirationDate(d.target.value)}
                        />
                        <Button
                            _hover={{ backgroundColor: 'lightgreen' }}
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                addInvitation(
                                    groupData.group_id,
                                    date,
                                    setValue
                                );
                                onCloseAddLink();
                                onOpenNewLink();
                            }}
                        >
                            <MdAddLink size={30} />
                        </Button>
                    </Flex>
                </Box>
            </ModalContent>
        </Modal>
    );
}
