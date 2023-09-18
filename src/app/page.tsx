'use client';

import { ProjectsOverview } from '@/components/project/ProjectsOverview';
import { Box, Heading } from '@chakra-ui/react';

export default function Home() {
	return (
		<Box mx={10}>
			<Box mt={20}>
				<Heading as="h1" size="4xl">
					Dashboard
				</Heading>
			</Box>

			<Box mt={5}>
				<ProjectsOverview />
			</Box>
		</Box>
	);
}
