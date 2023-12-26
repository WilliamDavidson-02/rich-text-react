import { createClient } from "@supabase/supabase-js";

const url: string = import.meta.env.SUPABASE_URL;
const key: string = import.meta.env.SUPABASE_KEY;

const supabase = createClient(url, key);

export default supabase;
