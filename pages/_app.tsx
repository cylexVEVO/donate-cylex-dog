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
			</Head>
			<Component {...pageProps}/>
		</div>
	);
};

export default App;