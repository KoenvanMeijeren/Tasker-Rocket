import { useSearchParams } from 'next/navigation';

export const useOpenedFileName = () => {
    const searchParams = useSearchParams();
    return searchParams?.get('file') ?? '';
};
