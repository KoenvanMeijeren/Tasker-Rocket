import Heading from '../../textStyles/Heading';

const fontSize = 13;

type Props = {
    name: string;
    textColor: string;
};

export default function NavItemTitle({ name, textColor }: Props) {
    return (
        <Heading
            color={textColor}
            display="flex"
            fontSize={fontSize}
            noOfLines={1}
        >
            {name}
        </Heading>
    );
}
