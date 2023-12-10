import { AlertStatus, useToast } from '@chakra-ui/react';

export const useCustomToast = () => {
    const toast = useToast();

    const customToast = (
        title: string,
        description: string,
        status: AlertStatus
    ) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 5000,
            isClosable: false,
            position: 'bottom-right',
        });
    };

    return customToast;
};
