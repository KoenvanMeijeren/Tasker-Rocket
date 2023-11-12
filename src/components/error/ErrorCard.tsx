import React from 'react';
import './errorCard.css';
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Button,
	Box,
	CloseButton,
} from '@chakra-ui/react';

function onDismiss() {
	window.location.reload();
}

function dismiss() {
	// delete this element from the DOM
	const element = document.querySelector('.error-card');
	if (element) {
		element.remove();
	}
	// Reload the page
	onDismiss();
}

function ErrorCard(error: string): JSX.Element {
	return (
		<Alert
			alignItems="center"
			justifyContent="center"
			status="error"
			textAlign="center"
		>
			<Box>
				<AlertTitle>An error occured!</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
				<Button colorScheme="blue">Button</Button>
				<AlertIcon />
			</Box>
			<CloseButton
				alignSelf="flex-start"
				onClick={dismiss}
				position="relative"
				right={-1}
				top={-1}
			/>
		</Alert>
	);
}

export default ErrorCard;
