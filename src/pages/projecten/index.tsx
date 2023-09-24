import { ProjectsOverview } from '@/components/project/ProjectsOverview';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Index() {
	const router = useRouter();

	useEffect(() => {
	  // Redirect to the '/projecten' page
	  router.push('/projecten');
	}, []); // Empty dependency array means this effect runs once after the initial render
  
	return null; 
}
