import React from 'react';

function onDismiss() {
	window.location.reload();
}

function ErrorCard(error: string): JSX.Element {
	return (
		<div className="error-card">
			<div className="error-content">
				<h1>Something went wrong</h1>
				<p>Error: {error}</p>
				<button onClick={onDismiss} type="button">
					I understand
				</button>
			</div>
		</div>
	);
}

export default ErrorCard;
