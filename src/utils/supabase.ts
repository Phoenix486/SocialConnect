
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zdbmpbaueouhgdamofct.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

//suppress typescript error
// @ts-ignore
export const supabase = createClient(supabaseUrl, supabaseKey);

