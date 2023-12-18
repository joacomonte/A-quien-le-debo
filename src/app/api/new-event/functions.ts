import { supabase } from "@/app/lib/supabaseClient";

export async function createEvent(eventName: string) {
  return await supabase.from("Events").insert([{ eventName }]).select();
}

export async function createMember(userName: string, eventId: number | null) {
  return await supabase
    .from("Members")
    .insert([{ memberName: userName, eventId }])
    .select();
}
