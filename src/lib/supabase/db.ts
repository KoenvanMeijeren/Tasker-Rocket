import { createBrowserClient } from '@supabase/ssr';
import { getEnvValue, EnvOptions } from '@/lib/utility/env';

const supabase = createBrowserClient(
    getEnvValue(EnvOptions.SupabaseUrl),
    getEnvValue(EnvOptions.SupabaseKey)
);

export default supabase;
