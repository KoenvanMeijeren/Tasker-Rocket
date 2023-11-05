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
	// Reload the page
	onDismiss();
}

function ErrorCard(error: string): JSX.Element {
	return (
		<div className="error-card">
			<div className="error-content">
				<h1>Something went wrong</h1>
				<p className="font-semibold">{error}</p>
				<p>
					The page will be reloaded automatically when you dismiss this message.
				</p>
				<button onClick={dismiss} type="button">
					I understand
				</button>
			</div>
		</div>
	);
}

export default ErrorCard;
