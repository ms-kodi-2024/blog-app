import NavBar from './NavBar';
import { Stack } from 'react-bootstrap';

const Header = () => {
	return (
		<Stack direction='horizontal' className='bg-primary p-3 text-light fs-5 rounded-3 my-4'>
			<div className='me-auto'>
				Blog.app
			</div>
			<NavBar />
		</Stack>
	)
}

export default Header;