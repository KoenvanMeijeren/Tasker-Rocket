import { useModeColors } from "@/hooks/useColors"
import { Box, Center, Divider } from "@chakra-ui/layout"

export default () => {
    const { border } = useModeColors();
    return (<Box display="flex" justifyContent="flex-start">
        <Center height="40px" ml="60px" p="4px" zIndex={1}>
            <Divider
                borderColor={border}
                borderWidth={2}
                opacity={1}
                orientation="vertical"
                zIndex={0}
            />
        </Center>
    </Box>
    )
}