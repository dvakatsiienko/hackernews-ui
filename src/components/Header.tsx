/* Core */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

/* Instruments */
import { AUTH_TOKEN } from '../constants';
import { book } from '../routes/book';
import Logo from './logo.png';

export const Header: React.FC = () => {
    const history = useHistory();
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
        <Section className="flex pa1 justify-between nowrap orange">
            <div className="flex flex-fixed black">
                <Logoi src={Logo} />
                <H1>Hacker News</H1>
                <Link to={book.newest} className="ml1 no-underline black">
                    new
                </Link>
                <div className="ml1">|</div>
                <Link to={book.top} className="ml1 no-underline black">
                    top
                </Link>
                <div className="ml1">|</div>
                <Link to={book.search} className="ml1 no-underline black">
                    search
                </Link>
                {authToken && (
                    <div className="flex">
                        <div className="ml1">|</div>
                        <Link
                            to={book.create}
                            className="ml1 no-underline black">
                            submit
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex flex-fixed">
                {authToken ? (
                    <div
                        className="ml1 pointer black"
                        onClick={() => {
                            localStorage.removeItem(AUTH_TOKEN);
                            history.push(`/`);
                        }}>
                        logout
                    </div>
                ) : (
                    <Link to={book.login} className="ml1 no-underline black">
                        login
                    </Link>
                )}
            </div>
        </Section>
    );
};

const Section = styled.section`
    padding: 2px;
    background-color: #ff6600;
    height: 24px;
`;
const Logoi = styled.img`
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
