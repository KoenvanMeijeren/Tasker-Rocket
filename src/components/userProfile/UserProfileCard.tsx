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
    HStack,
} from '@chakra-ui/react';
import { FaAngleDown, FaRegUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import useAuth from '@/hooks/useAuth';
import { SessionContext } from '@/providers/SessionProvider';
import Link from 'next/link';
import { HiOutlineUserGroup } from 'react-icons/hi';

export default function UserProfileCard() {
    const { signOut } = useAuth();
    const { session } = useContext(SessionContext);

    if (!session) return null;

    return (
        <Menu>
            <Text className="text-center m-4">
                {session.user.user_metadata.user_name}
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
                        name={session.user.user_metadata.user_name as string}
                        size="md"
                        src={session.user.user_metadata.avatar_url as string}
                    />
                    <FaAngleDown />
                </Flex>
            </MenuButton>
            <MenuList>
                <Link href="/profile">
                    <MenuItem>
                        <HStack>
                            <FaRegUser />

                            <Text>Profile</Text>
                        </HStack>
                    </MenuItem>
                </Link>
                <MenuDivider />
                <Link href="/groups/">
                    <MenuItem>
                        <HStack>
                            <HiOutlineUserGroup />

                            <Text>Groups</Text>
                        </HStack>
                    </MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem
                    onClick={() => {
                        void signOut();
                    }}
                >
                    <HStack>
                        <MdLogout />
                        <Text>Sign out</Text>
                    </HStack>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
