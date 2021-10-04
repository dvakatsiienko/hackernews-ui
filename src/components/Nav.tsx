/* Core */
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Breadcrumbs, BreadcrumbsItemProps, Themes } from '@geist-ui/react';
import { Aperture } from '@geist-ui/react-icons';
import styled from 'styled-components';

/* Instruments */
import { book } from '@/utils';
import { vars } from '@/lib/apollo';

const JWT_TOKEN_NAME = process.env.NEXT_PUBLIC_JWT_TOKEN_NAME;

export const Nav: React.FC = () => {
    const router = useRouter();
    const isAuthenticated = vars.useIsAuthenticated();

    const get$Active = (href: string) => {
        return router.pathname.includes(href);
    };

    const logout = () => {
        localStorage.removeItem(JWT_TOKEN_NAME);
        vars.isAuthenticated(false);
    };

    const handleApertureClick = () => {
        router.push(isAuthenticated ? '/new/1' : '/login');
    };

    return (
        <Section>
            <Breadcrumbs>
                <Aperture onClick = { handleApertureClick } />

                <NextLink href = '/new/1'>
                    <BreadcrumbItem nextLink $active = { get$Active(book.new) }>
                        new
                    </BreadcrumbItem>
                </NextLink>

                <NextLink href = { book.top }>
                    <BreadcrumbItem nextLink $active = { get$Active(book.top) }>
                        top 25
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
const Section = styled.nav`
    display: flex;
    justify-content: space-between;
    height: var(--nav-height);
    user-select: none;

    && svg {
        height: 18px;
        width: 18px;
        margin: 0;

        &:hover {
            color: ${Themes.getPresets()[ 0 ].palette.link} !important;
            cursor: pointer;
        }
    }
`;

/* Types */
interface TBreadcrumbsItemProps extends BreadcrumbsItemProps {
    readonly $active?: boolean;
}
const BreadcrumbItem = styled(Breadcrumbs.Item)<TBreadcrumbsItemProps>`
    ${props => props.$active
        && `color: ${Themes.getPresets()[ 0 ].palette.link} !important;`}
`;
