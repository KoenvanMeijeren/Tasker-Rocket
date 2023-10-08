import React from 'react';
import './errorCard.css';

function onDismiss() {
	window.location.reload();
}

function dismiss() {
	// delete this element from the DOM
	const element = document.querySelector('.error-card');
	if (element) {
		element.remove();
	}
	// delay for a second and run onDismiss
	onDismiss();
}

function ErrorCard(error: string): JSX.Element {
	return (
		<div className="error-card">
			<div className="error-content">
				<h1>Something went wrong</h1>
				<p className="text-red-800">{error}</p>
				<p>The page will be reloaded automatically.</p>
				<button onClick={dismiss} type="button">
					I understand
				</button>
			</div>
		</div>
	);
}

export default ErrorCard;
