/* Core */
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import styled, {
    ThemeProvider as StyledComponentsProvider,
} from 'styled-components';

/* Components */
import { Header } from '@/components';

/* Instruments */
import '@/theme/index.css';
import { useApollo } from '@/lib/apollo';

const App: React.FC<AppProps> = props => {
    const apolloClient = useApollo(props.pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <StyledComponentsProvider theme={{}}>
                <Head>
                    <link href="/favicon.ico" rel="icon" />
                    <title>Hackernews</title>
                    <link
                        href="/nprogress.css"
                        rel="stylesheet"
                        type="text/css"
                    />
                </Head>

                <div className="center w85">
                    <Header pathname={props.router.pathname} />

                    <Canvas className="ph3 pv1">
                        <props.Component {...props.pageProps} />
                    </Canvas>
                </div>
            </StyledComponentsProvider>
        </ApolloProvider>
    );
};

/* Styles */
const Canvas = styled.section`
    /* margin-top: 8px;
    box-sizing: border-box;
    max-width: 1618px;
    padding: 0; */
    background-color: rgb(246, 246, 239);
`;

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default App;
