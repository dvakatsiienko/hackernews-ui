/* Core */
import * as GUI from '@geist-ui/react';

/* Instruments */
import * as gql from '@/graphql';

export const UserProfile: React.FC<UserProfileProps> = props => {
    return (
        <GUI.Card>
            <GUI.Tabs initialValue = '1'>
                <GUI.Tabs.Item label = 'Profile' value = '1'>
                    {props.isEditable && <h2>Welcome, {props.user?.name}</h2>}
                    {!props.isEditable && <p>Name: {props.user?.name}</p>}

                    <p>Email: {props.user?.email}</p>
                    <p>Bio: {props.user?.bio}</p>
                </GUI.Tabs.Item>

                {props.isEditable && (
                    <GUI.Tabs.Item label = 'Edit' value = '2'>
                        Between the Web browser and the server, numerous
                        computers and machines relay the HTTP messages.
                    </GUI.Tabs.Item>
                )}
            </GUI.Tabs>
        </GUI.Card>
    );
};

/* Types */
interface UserProfileProps {
    isEditable?: boolean;
    user: gql.UserFragment;
}
