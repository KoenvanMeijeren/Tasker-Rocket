import {
    Button,
    Text,
    Menu,
    MenuButton,
    Flex,
    MenuList,
    MenuItem,
    HStack,
} from '@chakra-ui/react';
import { FaAngleDown, FaRegUser } from 'react-icons/fa';
import Link from 'next/link';

export default function UserProfileCard() {
    return (
        <Menu>
            <Text className="text-center m-4">Profile</Text>
            <MenuButton
                as={Button}
                cursor="pointer"
                minW={0}
                rounded="full"
                variant="link"
            >
                <Flex alignItems="center" direction="row">
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
            </MenuList>
        </Menu>
    );
}
