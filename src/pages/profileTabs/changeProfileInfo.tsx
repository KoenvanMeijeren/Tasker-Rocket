import { updateUserData } from '@/hooks/updateUserData';
import {
    Button,
    Heading,
    TabPanel,
    Text,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function ChangeProfileInfoTab() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <TabPanel>
            <VStack spacing={4}>
                <Heading>Change Profile Info</Heading>
                <Text>Update your first and last name:</Text>
                <Input
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    value={firstName}
                />
                <Input
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    value={lastName}
                />
                <Button
                    colorScheme="blue"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={updateUserData}
                    variant="ghost"
                >
                    Save Changes
                </Button>
            </VStack>
        </TabPanel>
    );
}
