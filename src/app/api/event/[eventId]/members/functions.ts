import { supabase } from "@/app/lib/supabaseClient";

export async function getAllMembers(eventId: string) {
  return await supabase.from("Members").select("*").eq("eventId", `${eventId}`);
}

export async function addMember(eventId: string, memberName: string) {
  if (eventId === undefined || memberName === undefined)
    return { error: "eventId and memberName are required" };

  try {
    // Checks duplicates
    const existingMember = await supabase
      .from("Members")
      .select("*")
      .eq("eventId", eventId)
      .eq("memberName", memberName)
      .single();

    if (existingMember?.data !== null) {
      return { error: "Duplicated" };
    }

    return await supabase.from("Members").insert({ eventId, memberName });
  } catch (error) {
    console.error("Error on database operation:", error);
    return { error: "Error on database operation" };
  }
}

export async function removeMember(eventId: string, memberId: number) {
  return await supabase
    .from("Members")
    .delete()
    .eq("eventId", `${eventId}`)
    .eq("memberId", `${memberId}`);
}
