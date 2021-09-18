/* Core */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';

/* Instruments */
import { book } from '@/routes/book';

const AUTH_TOKEN_NAME = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;

export const Header: React.FC = () => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        if (process.browser) {
            setAuthToken(localStorage.getItem(AUTH_TOKEN_NAME));
        }
    }, []);

    const get$Active = (href: string) => {
        if (process.browser) {
            return Router.pathname === href;
        }
    };

    return (
        <Section className="flex pa1 justify-between nowrap orange">
            <div className="flex flex-fixed black">
                <LogoImage src="/y18.gif" />
                <H1>Hacker News&nbsp;</H1>
                <Link href={book.newest}>
                    <A $active={get$Active(book.newest)}>new</A>
                </Link>
                <div className="ml1">|</div>

                <Link href={book.top}>
                    <A $active={get$Active(book.top)}>top</A>
                </Link>
                <div className="ml1">|</div>

                <Link href={book.search}>
                    <A $active={get$Active(book.search)}>search</A>
                </Link>

                {authToken && (
                    <div className="flex">
                        <div className="ml1">|</div>
                        <Link href={book.create}>
                            <A $active={get$Active(book.create)}>submit</A>
                        </Link>
                    </div>
                )}
            </div>

            <div className="flex flex-fixed">
                {authToken ? (
                    <div
                        className="ml1 pointer black"
                        onClick={() => {
                            localStorage.removeItem(AUTH_TOKEN_NAME);
                            setAuthToken(null);
                        }}>
                        <A>logout</A>
                    </div>
                ) : (
                    <Link href={book.login}>
                        <A $active={get$Active(book.login)}>login</A>
                    </Link>
                )}
            </div>
        </Section>
    );
};

/* Styles */
const Section = styled.section`
    padding: 2px;
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
const H1 = styled.h1`
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 0;
    font-family: Helvetica, system-ui;
`;

interface AProps {
    readonly $active?: boolean;
}
const A = styled.a<AProps>`
    cursor: pointer;

    &:hover,
    &:active {
        color: white;
    }

    ${props => props.$active && 'color: white; font-weight: 500;'}
`;
A.defaultProps = {
    className: 'ml1 no-underline black',
};
