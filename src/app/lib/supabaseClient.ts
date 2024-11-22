// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://hxphijeqohiomiypspsf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cGhpamVxb2hpb21peXBzcHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4ODE5MjMsImV4cCI6MjA0NzQ1NzkyM30.O6wBBd9bEjTmVefULGzy0VKvWN5DOvFUttfHb05TVNc';

if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseAnonKey)
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// NEXT_PUBLIC_SUPABASE_URL=https://hxphijeqohiomiypspsf.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cGhpamVxb2hpb21peXBzcHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4ODE5MjMsImV4cCI6MjA0NzQ1NzkyM30.O6wBBd9bEjTmVefULGzy0VKvWN5DOvFUttfHb05TVNc
            

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;