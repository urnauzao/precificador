import Head from "next/head";

export default function Header(props) {
    return(
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <title>{props.title}</title>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Noto+Sans+JP:wght@500;700&display=swap" 
            rel="stylesheet"/>
        </Head>
    )
}