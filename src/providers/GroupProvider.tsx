import supabase from '@/lib/supabase/db';
import { useClipboard, useDisclosure } from '@chakra-ui/react';
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
    const {
        isOpen: isAddLinkOpen,
        onOpen: onOpenAddLink,
        onClose: onCloseAddLink,
    } = useDisclosure();
    const {
        isOpen: isNewLinkOpen,
        onOpen: onOpenNewLink,
        onClose: onCloseNewLink,
    } = useDisclosure();
    const [date, setExpirationDate] = useState<string>('');
    const router = useRouter();
    const { group_id: groupId } = router.query;
    const { onCopy, value, setValue, hasCopied } = useClipboard('');

    const fetchData = async () => {
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
        void fetchData();
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
        void fetchData();
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
        void fetchData();
        return data as Data;
    };

    const deleteGroup = async (group_Id) => {
        const { error } = await supabase
            .from('groups')
            .delete()
            .eq('group_id', group_Id);
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
        void fetchData();
    };

    // Provide the state and functions to the children components
    return (
        <GroupContext.Provider
            value={{
                groupData,
                fetchData,
                setData,
                deleteInvitation,
                addInvitation,
                isAddLinkOpen,
                onOpenAddLink,
                onCloseAddLink,
                isNewLinkOpen,
                onOpenNewLink,
                onCloseNewLink,
                date,
                setExpirationDate,
                onCopy,
                value,
                setValue,
                hasCopied,
                deleteGroup,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
}

export { GroupContext, GroupProvider };
