import { Button, Heading, TabPanel, Text, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';

export default function ChangeProfileInfoTab() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSaveChanges = () => {
        // TODO: Implement save changes logic
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
    };

    return (
        <TabPanel>
            <VStack spacing={4}>
                <Heading>Change Profile Info</Heading>
                <Text>Update your first and last name:</Text>
                <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Button
                    colorScheme="blue"
                    onClick={handleSaveChanges}
                    variant="ghost"
                >
                    Save Changes
                </Button>
            </VStack>
        </TabPanel>
    );
}
