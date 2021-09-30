/* Core */
import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

/* Instruments */
import { book } from '@/utils';
import { vars } from '@/lib/apollo';

const AUTH_TOKEN_NAME = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;

export const Header: React.FC = () => {
    const router = useRouter();
    const isAuthenticated = useReactiveVar(vars.isAuthenticated);

    const get$Active = (href: string) => {
        return router.pathname.includes(href);
    };

    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN_NAME);
        vars.isAuthenticated(false);
    };

    return (
        <Section className = 'flex pa1 justify-between nowrap orange'>
            <div className = 'flex flex-fixed black'>
                <LogoImage
                    src = '/y18.gif'
                    onClick = { () => router.push('/new/1') }
                />
                <H1 onClick = { () => router.push('/new/1') }>Hacker News&nbsp;</H1>

                <Link href = '/new/1'>
                    <A $active = { get$Active(book.new) }>new</A>
                </Link>
                <div className = 'ml1'>|</div>

                <Link href = { book.top }>
                    <A $active = { get$Active(book.top) }>top</A>
                </Link>
                <div className = 'ml1'>|</div>

                <Link href = { book.search }>
                    <A $active = { get$Active(book.search) }>search</A>
                </Link>

                {isAuthenticated && (
                    <div className = 'flex'>
                        <div className = 'ml1'>|</div>
                        <Link href = { book.create }>
                            <A $active = { get$Active(book.create) }>submit</A>
                        </Link>
                    </div>
                )}
            </div>

            <div className = 'flex flex-fixed'>
                {isAuthenticated ? (
                    <div className = 'ml1 pointer black' onClick = { logout }>
                        <A>logout</A>
                    </div>
                ) : (
                    <Link href = { book.login }>
                        <A $active = { get$Active(book.login) }>login</A>
                    </Link>
                )}
            </div>
        </Section>
    );
};

/* Styles */
const Section = styled.section`
    padding: 2px;
    padding-right: 5px;
    background-color: #ff6600;
    height: 24px;
`;
const LogoImage = styled.img`
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    margin-right: 4px;
    border: 1px solid white;
    cursor: pointer;
`;

interface ActiveProp {
    readonly $active?: boolean;
}
const H1 = styled.h1<ActiveProp>`
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 0;
    font-family: Helvetica, system-ui;

    &:hover {
        color: white;
    }

    ${props => props.$active && 'color: white; font-weight: 700;'}
`;
const A = styled.a<ActiveProp>`
    cursor: pointer;

    &:hover {
        color: white;
    }

    ${props => props.$active && 'color: white; font-weight: 500;'}
`;
A.defaultProps = {
    className: 'ml1 no-underline black',
};
