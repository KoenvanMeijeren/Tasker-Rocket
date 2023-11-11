'use client';

import theme from '@/components/theme/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { persistedStore, store } from '@/lib/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                <Provider store={store}>
                    <PersistGate persistor={persistedStore}>
                        {children}
                    </PersistGate>
                </Provider>
            </ChakraProvider>
        </CacheProvider>
    );
}
