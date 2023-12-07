import { useModeColors } from '@/hooks/useModeColors';
import { Button, Heading, TabPanel, Text } from '@chakra-ui/react';

export default function DeleteAccountTab() {
    const { backgroundColorPrimary } = useModeColors();
    const handleDeleteAccount = () => {
        // TODO: Implement delete account logic
    };

    return (
        <TabPanel>
            <Heading>Delete Account</Heading>
            <Text>Are you sure you want to delete your account?</Text>
            <Button borderColor="red" onClick={handleDeleteAccount}>
                Delete Account
            </Button>
        </TabPanel>
    );
}
