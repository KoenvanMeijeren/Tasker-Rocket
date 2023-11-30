import { useContext } from 'react';
import {
    Button,
    Text,
    Menu,
    MenuButton,
    Flex,
    Avatar,
    MenuList,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import useLogin from '@/hooks/useAuth';
import { SessionContext } from '@/providers/SessionProvider';

export default function UserProfileCard() {
    const { signOut } = useLogin();
    const { session } = useContext(SessionContext);

    if (!session) {
        return null;
    } else {
        return (
            <Menu>
                <Text className="text-center m-4">
                    {session?.user?.user_metadata.user_name}
                </Text>
                <MenuButton
                    as={Button}
                    cursor="pointer"
                    minW={0}
                    rounded="full"
                    variant="link"
                >
                    <Flex alignItems="center" direction="row">
                        <Avatar
                            name={
                                session?.user?.user_metadata.user_name as string
                            }
                            size="md"
                            src={
                                session?.user?.user_metadata
                                    .avatar_url as string
                            }
                        />
                        <FaAngleDown />
                    </Flex>
                </MenuButton>
                <MenuList>
                    <MenuItem
                        _hover={{ bg: '#f5f5f5' }}
                        onClick={() => (window.location.href = '/profile')}
                    >
                        <FaRegUser />
                        Profile
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem _hover={{ bg: '#f5f5f5' }} onClick={signOut}>
                        <MdLogout />
                        Sign out
                    </MenuItem>
                </MenuList>
            </Menu>
        );
    }
}
