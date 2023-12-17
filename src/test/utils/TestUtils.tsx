/* eslint-disable import/export */
import { Providers } from '@/providers/Providers';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
