'use client';

import './globals.css';
import React from 'react';
import { Providers } from './providers';
import SidebarWithHeader from '@/components/navigation/SidebarWithHeader';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="nl">
			<body>
				<Providers>
					<SidebarWithHeader>
						<>{children}</>
					</SidebarWithHeader>
				</Providers>
			</body>
		</html>
	);
}
