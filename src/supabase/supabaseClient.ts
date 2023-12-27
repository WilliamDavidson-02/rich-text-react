import { createClient } from "@supabase/supabase-js";

export type AuthProviders = "github" | "discord";

const url: string = import.meta.env.VITE_SUPABASE_URL;
const key: string = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(url, key);

export default supabase;
