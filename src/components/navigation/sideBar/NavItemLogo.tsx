import { nameToLogo } from '@/lib/utility/formatters';
import { Flex } from '@chakra-ui/react';
import NavItemTitle from '@/components/navigation/sideBar/NavItemTitle';
import { useColorConfig } from '@/lib/colors/useColorConfig';

const chevronBoxSize = 20;

const horizontalPadding = 6;

type Props = {
    name: string;
    textColor: string;
    backgroundColor?: string;
};

export default function NavItemLogo({
    name,
    textColor,
    backgroundColor,
}: Props) {
    const colorConfig = useColorConfig();

    return (
        <Flex
            alignItems="center"
            aspectRatio={1}
            backgroundColor={backgroundColor ?? colorConfig.backgroundPrimary}
            borderRadius={4}
            height={`${chevronBoxSize + horizontalPadding * 2 - 4}px`}
            justifyContent="center"
            my="2px"
            opacity={0.8}
        >
            <NavItemTitle
                name={nameToLogo(name).toUpperCase()}
                textColor={textColor}
            />
        </Flex>
    );
}
