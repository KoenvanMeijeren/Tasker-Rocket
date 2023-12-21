import { GroupContext } from '@/providers/GroupProvider';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Heading,
    Button,
    Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FaClipboard } from 'react-icons/fa';

export default function addInvitePopup() {
    const { onCopy, value, date, isNewLinkOpen, onCloseNewLink, hasCopied } =
        useContext(GroupContext);

    return (
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

                    <Button onClick={onCopy} leftIcon={<FaClipboard />}>
                        {hasCopied ? 'Copied!' : 'Copy'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
