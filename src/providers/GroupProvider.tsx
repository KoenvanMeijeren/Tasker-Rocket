import supabase from '@/lib/supabase/db';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/naming-convention
import React, { createContext, useEffect, useState } from 'react';

interface Data {
    group_id: string;
    name: string;
    description: string;
    users: {
        user_id: string;
        first_name: string;
        last_name: string;
        progress: string;
    }[];
    invitations: Invitation[];
}

interface Invitation {
    group_id: string;
    signature: string;
    created_at: string;
    expires_at: string;
}

interface GroupContextTypes {
    groupData: Data | null;
}

// Create a context for your provider
const GroupContext = createContext<GroupContextTypes>({
    groupData: null,
});

// Create your provider component

export default function GroupProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // Define the state and any necessary functions
    const [groupData, setData] = useState<Data>();
    const router = useRouter();
    const { group_id: groupId } = router.query;

    const fetchGroupData = async () => {
        if (!groupId) {
            return;
        }
        const { data: gottenData, error } = await supabase
            .from('groups')
            .select(
                'group_id, name, description, users(user_id, first_name, last_name, progress), invitations(group_id, signature, created_at, expires_at)'
            )
            .eq('group_id', groupId)
            .single();
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error.message, error.details, 'error');
        }
        if (gottenData) {
            setData(gottenData);
        }
    };

    useEffect(() => {
        void fetchGroupData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupId]);

    const deleteInvitation = async (invitations: Invitation) => {
        const { error } = await supabase
            .from('invitations')
            .delete()
            .eq('group_id', invitations.group_id)
            .eq('signature', invitations.signature);
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
        void fetchGroupData();
    };

    const addInvitation = async (
        invitationGroupId: string,
        expirationDate: string
    ) => {
        const { error, data } = await supabase
            .from('invitations')
            .insert({
                group_id: invitationGroupId,
                expires_at: expirationDate,
            })
            .select()
            .single();
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
        void fetchGroupData();
        return data as Data;
    };

    

    // Provide the state and functions to the children components
    return (
        <GroupContext.Provider
            value={{
                groupData,
                deleteInvitation,
                addInvitation,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
}

export { GroupContext, GroupProvider };
