/* Core */
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import styled, {
    ThemeProvider as StyledComponentsProvider
} from 'styled-components';

/* Components */
import { Authenticator, Header } from '@/components';

/* Instruments */
import '@/theme/index.css';
import { useApollo } from '@/lib/apollo';

const App: React.FC<AppProps> = props => {
    const apolloClient = useApollo(props.pageProps.initialApolloState);

    return (
        <ApolloProvider client = { apolloClient }>
            <Authenticator>
                <StyledComponentsProvider theme = {{}}>
                    <Head>
                        <link href = '/favicon.ico' rel = 'icon' />
                        <title>Hackernews</title>
                        <link
                            href = '/nprogress.css'
                            rel = 'stylesheet'
                            type = 'text/css'
                        />
                    </Head>

                    <div className = 'center w85'>
                        <Header />

                        <Canvas className = 'ph3 pv1'>
                            <props.Component { ...props.pageProps } />
                        </Canvas>
                    </div>
                </StyledComponentsProvider>
            </Authenticator>
        </ApolloProvider>
    );
};

/* Styles */
const Canvas = styled.section`
    background-color: rgb(246, 246, 239);
    height: calc(100vh - 24px - 10px);
`;

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default App;
