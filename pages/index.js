import Head from 'next/head';
import Main from './main.js';
import '../public/css/style.css';

function IndexPage() {
	return (
		<div>
			<Head>
				<title>My page title</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="../js/1.js"></script>
        <script src="../js/2.js"></script>
			</Head>
			<Main/>
		</div>
	);
}

export default IndexPage;
