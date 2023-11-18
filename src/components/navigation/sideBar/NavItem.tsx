import { Center, Divider } from '@chakra-ui/layout';
import { Box, Collapse, Flex, Link, useDisclosure } from '@chakra-ui/react';

import { useModeColors } from '@/hooks/useColors';
import { getParentFromUrl } from '@/lib/utility/formatters';
import { NavSize } from '@/types/navSize';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Heading from '../../textStyles/Heading';
import { GithubTreeMenuItem } from './SideBar';

interface NavItemProps {
    treeItem: GithubTreeMenuItem;
    active?: boolean;
    navSize: NavSize;
}

const marginLeft = 10;
const chevronBoxSize = 8;

export const VertDivider = () => {
    const { border } = useModeColors();

    return (
        <Flex height="100%" justifyContent="flex-start">
            <Center boxSize={chevronBoxSize} zIndex={1}>
                <Divider
                    borderColor={border}
                    borderWidth={1}
                    opacity={0.8}
                    orientation="vertical"
                    zIndex={0}
                />
            </Center>
        </Flex>
    );
};
export default function NavItem({
    treeItem,
    active = false,
    navSize,
}: NavItemProps) {
    const { isOpen, onToggle } = useDisclosure();
    const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
    const bg = 'rgba(41, 236, 172, 0.3)';

    if (treeItem.tree.length > 0) {
        return (
            <Box
                alignItems={navSize === NavSize.Small ? 'center' : 'flex-start'}
                flexDir="column"
                justifyContent="center"
                marginLeft={chevronBoxSize}
                order={1}
            >
                <Flex>
                    <VertDivider />
                    <Flex
                        _hover={{
                            backgroundColor: bg,
                        }}
                        alignItems="center"
                        backgroundColor={active ? bg : undefined}
                        borderRadius={8}
                        cursor="pointer"
                        onClick={onToggle}
                        opacity="80%"
                        paddingRight={3}
                        w={navSize == NavSize.Large ? '100%' : undefined}
                    >
                        <ChevronDownIcon
                            boxSize={chevronBoxSize}
                            color="white"
                            transform={rotate}
                            transition="all 0.2s linear"
                        />

                        {/* LOGO */}
                        <Heading>TR</Heading>

                        {/* TITLE */}
                        {navSize === NavSize.Large ? (
                            <Heading display="flex" ml={2} noOfLines={1}>
                                {treeItem.name}
                            </Heading>
                        ) : null}
                    </Flex>
                </Flex>

                <Collapse in={isOpen}>
                    {treeItem.tree.map((item) => (
                        <Flex key={item.path}>
                            <VertDivider key={item.path} />
                            <NavItem
                                key={item.path}
                                navSize={navSize}
                                treeItem={item}
                            />
                        </Flex>
                    ))}
                </Collapse>
            </Box>
        );
    } else {
        const parent = getParentFromUrl(treeItem.path);
        const url = `/${encodeURIComponent(parent)}`;

        return (
            <Link href={`${url}?file=${treeItem.name}`}>
                <Flex
                    _hover={{
                        backgroundColor: bg,
                    }}
                    alignItems="center"
                    backgroundColor={active ? bg : undefined}
                    borderRadius={8}
                    cursor="pointer"
                    marginLeft={marginLeft}
                    onClick={onToggle}
                    opacity="80%"
                    p={3}
                    w={navSize == NavSize.Large ? '100%' : undefined}
                >
                    {/* LOGO */}
                    <Heading>TR</Heading>

                    {/* TITLE */}
                    {navSize === NavSize.Large ? (
                        <Heading display="flex" ml={5} noOfLines={1}>
                            {treeItem.name}
                        </Heading>
                    ) : null}
                </Flex>
            </Link>
        );
    }
}
