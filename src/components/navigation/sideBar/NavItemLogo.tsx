import { useModeColors } from '@/hooks/useModeColors';
import { nameToLogo } from '@/lib/utility/formatters';
import { Flex } from '@chakra-ui/react';
import NavItemTitle from '@/components/navigation/sideBar/NavItemTitle';

const chevronBoxSize = 20;

const horizontalPadding = 6;

export default function NavItemLogo({ name }: { name: string }) {
    const { backgroundColorPrimary } = useModeColors();
    return (
        <Flex
            alignItems="center"
            aspectRatio={1}
            backgroundColor={backgroundColorPrimary}
            borderRadius={4}
            height={`${chevronBoxSize + horizontalPadding * 2 - 4}px`}
            justifyContent="center"
            my="2px"
            opacity={0.8}
        >
            <NavItemTitle name={nameToLogo(name).toUpperCase()} />
        </Flex>
    );
}
