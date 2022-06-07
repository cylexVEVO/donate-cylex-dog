import * as React from "react";
import type {AppProps} from "next/app";
import "../styles.scss";
import Head from "next/head";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
	return (
		<div className={"px-3 lg:px-0"}>
			<Head>
				<title>Donate using my money</title>
				<meta name="description" content="Click this button a bunch of times and make me spend money."/>
				<script async src="https://ackee.cylex.dog/tracker.js" data-ackee-server="https://ackee.cylex.dog" data-ackee-domain-id="74d92354-0425-4046-abb9-f3ae288ced21"/>
			</Head>
			<Component {...pageProps}/>
		</div>
	);
};

export default App;