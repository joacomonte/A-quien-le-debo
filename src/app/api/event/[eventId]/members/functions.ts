import { supabase } from "@/app/lib/supabaseClient";

export async function getAllMembers(eventId: string) {
  return await supabase.from("Members").select("*").eq("eventId", `${eventId}`);
}

export async function addMember(eventId: string, memberName: string) {
  return await supabase
    .from("Members")
    .insert({ eventId: eventId, memberName: memberName });
}

export async function removeMember(eventId: string, memberId: number) {
  return await supabase
    .from("Members")
    .delete()
    .eq("eventId", `${eventId}`)
    .eq("memberId", `${memberId}`);
}
