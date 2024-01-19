import { useModeColors } from '@/hooks/useModeColors';
import Heading from '../../textStyles/Heading';

const fontSize = 13;

export default function NavItemTitle({ name }: { name: string }) {
    const { fontColor } = useModeColors();
    return (
        <Heading
            color={fontColor}
            display="flex"
            fontSize={fontSize}
            noOfLines={1}
        >
            {name}
        </Heading>
    );
}
