import supabase from '@/lib/supabase/db';

let sortAscending = true;

export function handleSort() {
    sortAscending = !sortAscending;
    return sortAscending;
}

export async function createNewGroup(
    groupName: string,
    groupDescription: string
) {
    const { data, error } = await supabase.from('groups').insert([
        {
            name: groupName,
            description: groupDescription,
        },
    ]);
    // creating the link with the user is done in supabase via a trigger
    if (error) {
        console.error(error);
    }
    return data;
}
