/* Core */
import Link from 'next/link';
import { Image } from '@geist-ui/react';
import styled from 'styled-components';

/* Components */
import { Header } from '@/components';

export const Layout: React.FC = props => {
    return (
        <Container>
            <Image.Browser
                invert
                // @ts-ignore
                title = { (
                    <Link href = '/new/1'>
                        <A>λ Hackernews</A>
                    </Link>
                ) }
            >
                <Header />
                <InnerContainer>{props.children}</InnerContainer>
            </Image.Browser>
        </Container>
    );
};

/* Styles */
const Container = styled.section`
    margin: 100px auto;
    padding: 0 24px;

    && .bowser {
        width: 100%;
        min-height: calc(100vh - 200px);
    }
`;

/* Styles */
const InnerContainer = styled.section`
    margin: 0 auto;
    padding: 10px;
`;

const A = styled.a`
    font-weight: 500;
    color: white;

    &:hover {
        text-decoration: underline;
        font-weight: 600;
    }
`;
