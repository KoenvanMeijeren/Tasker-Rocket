import { useModeColors } from "@/hooks/useColors";
import { GitHubTreeItem } from "@/lib/repository/gitHubData";
import { Card, CardBody } from "@chakra-ui/card";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Collapse, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import Text from "../textStyles/Text";
import Heading from "../textStyles/Heading";

export const FoldersSection = ({ data }: { data: GitHubTreeItem[] }) => {
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
    const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
    const { backgroundColorSecondary, backgroundColorPrimary, fontColor } = useModeColors();

    return (
        <Box
            zIndex={2}
            transition={'background-color 0.5s ease'}
            backgroundColor={backgroundColorSecondary}
            px={6}
            py={1}
            boxShadow={'0px 4px 10px -3px rgba(0, 0, 0, 0.07)'}
        >
            {/* header (collapsible) */}
            <Box
                cursor={'pointer'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                onClick={onToggle}
            >
                <Heading className="noselect">Folders</Heading>
                <ChevronDownIcon
                    transform={rotate}
                    transition={'all 0.2s linear'}
                    boxSize={10}
                    color={fontColor}
                />
            </Box>

            {/* Content */}
            <Collapse in={isOpen}>
                <Box overflowX={'auto'} display={'flex'} py={3} gap={4}  >
                    {data.map((item: GitHubTreeItem) => {
                        console.log(data.length)
                        return (
                            <Link style={{ flexShrink: 0 }} href={`/${encodeURIComponent(item.path)}`}>
                                <Card backgroundColor={backgroundColorPrimary}>
                                    <CardBody py={3}>
                                        <Text>{item.name}</Text>
                                    </CardBody>
                                </Card>
                            </Link>
                        );
                    })}
                </Box>
            </Collapse>
        </Box>

    )
}