/* Core */
import { useReactiveVar } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Breadcrumbs, BreadcrumbsItemProps, Themes } from '@geist-ui/react';
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
        <Section>
            <Breadcrumbs>
                <NextLink href = '/new/1'>
                    <BreadcrumbItem nextLink $active = { get$Active(book.new) }>
                        new
                    </BreadcrumbItem>
                </NextLink>

                <NextLink href = { book.top }>
                    <BreadcrumbItem nextLink $active = { get$Active(book.top) }>
                        top
                    </BreadcrumbItem>
                </NextLink>

                <NextLink href = { book.search }>
                    <BreadcrumbItem nextLink $active = { get$Active(book.search) }>
                        search
                    </BreadcrumbItem>
                </NextLink>

                {isAuthenticated && (
                    <NextLink href = { book.create }>
                        <BreadcrumbItem
                            nextLink
                            $active = { get$Active(book.create) }
                        >
                            submit
                        </BreadcrumbItem>
                    </NextLink>
                )}
            </Breadcrumbs>

            <Breadcrumbs>
                {isAuthenticated ? (
                    <NextLink href = '.'>
                        <BreadcrumbItem nextLink onClick = { logout }>
                            logout
                        </BreadcrumbItem>
                    </NextLink>
                ) : (
                    <NextLink href = { book.login }>
                        <BreadcrumbItem
                            nextLink
                            $active = { get$Active(book.login) }
                        >
                            login
                        </BreadcrumbItem>
                    </NextLink>
                )}
            </Breadcrumbs>
        </Section>
    );
};

/* Styles */
const Section = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 0 7px;
    /* height: 24px; */
`;

interface TBreadcrumbsItemProps extends BreadcrumbsItemProps {
    readonly $active?: boolean;
}
const BreadcrumbItem = styled(Breadcrumbs.Item)<TBreadcrumbsItemProps>`
    ${props => props.$active
        && `color: ${Themes.getPresets()[ 0 ].palette.link} !important;`}
`;
