import { LoadingIndicator } from '@/components/general/LoadingIndicator';
// eslint-disable-next-line @typescript-eslint/naming-convention
import Heading from '@/components/textStyles/Heading';
import { useModeColors } from '@/hooks/useModeColors';
import { useCustomToast } from '@/lib/utility/toast';
import { GroupContext } from '@/providers/GroupProvider';
import {
    Box,
    Button,
    Card,
    CardBody,
    Divider,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    useDisclosure,
    Input,
    FormControl,
    useClipboard,
    ModalFooter,
    Popover,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import { MdAddLink, MdGroupAdd, MdLink, MdLinkOff } from 'react-icons/md';

export default function GroupInfo() {
    const [date, setExpirationDate] = useState<string>('');
    const { backgroundColorSecondary } = useModeColors();
    const {
        isOpen: isAddLinkOpen,
        onOpen: onOpenAddLink,
        onClose: onCloseAddLink,
    } = useDisclosure();
    const {
        isOpen: isNewLinkOpen,
        onOpen: onOpenNewLink,
        onClose: onCloseNewLink,
    } = useDisclosure();
    const { onCopy, value: copyValue, setValue, hasCopied } = useClipboard('');
    const createInputFormInvalid = date === '';
    const customToast = useCustomToast();

    const { groupData, deleteInvitation, addInvitation } =
        useContext(GroupContext);

    if (!groupData) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <Box bg={backgroundColorSecondary} p={5} borderRadius="5">
                <Flex>
                    <Heading fontSize="2xl">{groupData?.name} </Heading>
                    <Spacer />
                    <Button
                        p={0}
                        onClick={() => {
                            onOpenAddLink();
                        }}
                    >
                        <MdGroupAdd size={30} />
                    </Button>
                </Flex>

                <Text>{groupData.description}</Text>
            </Box>
            {groupData.users.map((user) => (
                <Card key={user.user_id} m={5}>
                    <CardBody>
                        <Heading fontSize="lg">
                            {user.first_name} {user.last_name}
                        </Heading>
                        <Divider my={1} />
                        <Text>Progress: {user.progress}</Text>
                    </CardBody>
                </Card>
            ))}

            <Modal isOpen={isAddLinkOpen} onClose={onCloseAddLink}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Invitations</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
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
                                            console.log(copyValue);
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
                        <FormControl isInvalid={createInputFormInvalid}>
                            <Flex>
                                <Input
                                    type="date"
                                    value={date}
                                    onChange={(d) =>
                                        setExpirationDate(d.target.value)
                                    }
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
                        </FormControl>
                    </Box>
                </ModalContent>
            </Modal>

            <Modal isOpen={isNewLinkOpen} onClose={onCloseNewLink}>
                <ModalOverlay />
                <ModalContent>
                    <Heading fontSize="xl" mx={5} mt={5}>
                        Link created!
                    </Heading>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            It will expire on {date?.split('-')[2]}-
                            {date?.split('-')[1]}-{date?.split('-')[0]}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Text>Share this link:</Text>

                        <Button
                            onClick={() => {
                                console.log(copyValue);
                                onCopy();
                            }}
                            leftIcon={<FaClipboard />}
                        >
                            {hasCopied ? 'Copied!' : 'Copy'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

/*import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import InvitePopup from '@/components/groups/InvitePopup';
import AddInvitePopup from '@/components/groups/AddInvitePopup';
// eslint-disable-next-line @typescript-eslint/naming-convention
import Heading from '@/components/textStyles/Heading';
import { useModeColors } from '@/hooks/useModeColors';
import { GroupContext } from '@/providers/GroupProvider';
import {
    Box,
    Button,
    Card,
    CardBody,
    Divider,
    Flex,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { MdGroupAdd } from 'react-icons/md';

export default function GroupInfo() {
    const { backgroundColorSecondary } = useModeColors();

    const { groupData, onOpenAddLink } = useContext(GroupContext);

    if (!groupData) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <Box bg={backgroundColorSecondary} p={5} borderRadius="5">
                <Flex>
                    <Heading fontSize="2xl">{groupData?.name} </Heading>
                    <Spacer />
                    <Button
                        p={0}
                        onClick={() => {
                            onOpenAddLink();
                        }}
                    >
                        <MdGroupAdd size={30} />
                    </Button>
                </Flex>

                <Text>{groupData.description}</Text>
            </Box>
            {groupData.users.map((user) => (
                <Card key={user.user_id} m={5}>
                    <CardBody>
                        <Heading fontSize="lg">
                            {user.first_name} {user.last_name}
                        </Heading>
                        <Divider my={1} />
                        <Text>Progress: {user.progress}</Text>
                    </CardBody>
                </Card>
            ))}
            <InvitePopup />
            <AddInvitePopup />
        </>
    );
}
*/
