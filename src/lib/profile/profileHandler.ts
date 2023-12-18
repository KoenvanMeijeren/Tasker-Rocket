import supabase from '../supabase/db';

export async function updateUserData(firstName: string, lastName: string) {
    await supabase
        .from('users')
        .update({ first_name: firstName, last_name: lastName })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
}

export async function deleteUser() {
    await supabase
        .from('users')
        .delete()
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
    //TODO: delete the user data from the auth schema as well
}
