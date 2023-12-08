import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Heading,
    TabPanel,
    Text,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { deleteUser } from '@/hooks/deleteUser';

export default function DeleteAccountTab() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement | null>(null); // Add variable declarator

    return (
        <TabPanel>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Are you sure?
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                ml={3}
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onClick={deleteUser}
                                variant="ghost"
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <VStack spacing={4}>
                <Heading>Delete Account</Heading>
                <Text>
                    Deleting your account will remove all your data from the
                    system. This action cannot be undone.
                </Text>
                <Button colorScheme="red" onClick={onOpen} variant="ghost">
                    Delete Account
                </Button>
            </VStack>
        </TabPanel>
    );
}
