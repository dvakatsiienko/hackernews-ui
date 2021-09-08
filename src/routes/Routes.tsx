/* Core */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

/* Components */
import { LinkList } from '../components/LinkList';
import { CreateLink } from '../components/CreateLink';
import { Header } from '../components/Header';
import { Login } from '../components/Login';
import { Search } from '../components/Search';

/* Instruments */
import { book } from './book';

export const App: React.FC = () => {
    return (
        <div className="center w85">
            <Canvas className="ph3 pv1 background-gray">
                <Header />
                <Switch>
                    <Route exact path={book.login} component={Login} />
                    <Route exact path={book.create} component={CreateLink} />
                    <Route exact path={book.search} component={Search} />
                    <Route exact path={book.top} component={LinkList} />
                    <Route exact path={book.newestPage} component={LinkList} />
                    <Redirect to={`${book.newest}/1`} />
                </Switch>
            </Canvas>
        </div>
    );
};

const Canvas = styled.section`
    margin-top: 8px;
    box-sizing: border-box;
    max-width: 1618px;
    padding: 0;
`;
