import { ProfileContext } from '@/providers/ProfileProvider';
import {
    Button,
    Heading,
    TabPanel,
    Text,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useState, useContext } from 'react';

export default function ChangeProfileInfoTab() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { updateUserData } = useContext(ProfileContext);

    return (
        <TabPanel>
            <VStack spacing={4}>
                <Heading>Change Profile Info</Heading>
                <Text>Update your first and last name:</Text>
                <Input
                    maxLength={64}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    value={firstName}
                />
                <Input
                    maxLength={64}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    value={lastName}
                />
                <Button
                    colorScheme="blue"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-return
                    onClick={() => updateUserData(firstName, lastName)}
                    variant="ghost"
                >
                    Save Changes
                </Button>
            </VStack>
        </TabPanel>
    );
}
