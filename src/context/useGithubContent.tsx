import { useContext } from 'react';
import { GithubContentContext } from './githubContentContext';

export const useGithubContent = () => {
	const context = useContext(GithubContentContext);
	if (!context) {
		throw new Error(
			'useGithubContent must be used within GithubContentProvider',
		);
	}
	return context;
};
