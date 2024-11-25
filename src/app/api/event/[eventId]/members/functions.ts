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

export async function getMemberName(eventId: string, memberId: number) {
  try {
    const { data, error } = await supabase
      .from("Members")
      .select("memberName")
      .eq("eventId", eventId)
      .eq("memberId", memberId)
      .single();

    if (error) {
      console.error("Error fetching member name:", error);
      return { error: "Error fetching member name" };
    }

    return { memberName: data?.memberName || null };
  } catch (error) {
    console.error("Error on database operation:", error);
    return { error: "Error on database operation" };
  }
}

export async function updateMemberName(eventId: string, memberId: number, newName: string) {
  // Validate new name
  if (!newName || newName.trim().length === 0) {
    return { error: "Member name cannot be empty" };
  }

  if (newName.length > 15) {
    return { error: "Member name cannot be longer than 15 characters" };
  }

  try {
    const { data, error } = await supabase
      .from("Members")
      .update({ memberName: newName })
      .eq("eventId", eventId)
      .eq("memberId", memberId)
      .single();

    if (error) {
      console.error("Error updating member name:", error);
      return { error: "Error updating member name" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error on database operation:", error);
    return { error: "Error on database operation" };
  }
}