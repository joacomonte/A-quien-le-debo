import { supabase } from "@/app/lib/supabaseClient";


export async function getMemberBalance(eventId: string, memberId: string) {
  let memberSpent: number = 0;

  if (eventId === undefined || memberId === undefined)
    return { error: "eventId and memberId are required" };

  try {
    const { data, error } = await supabase
      .from("Spendings")
      .select("amount")
      .eq("spenderId", memberId)
      .eq("eventId", eventId);

    // Calculate substract of amounts
    memberSpent = data?.reduce((substract, record) => substract - (record.amount || 0), 0) || 0;

    return memberSpent

  } catch (error) {
    console.error('Error calculating total spendings:', error);
    return {
      totalAmount: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}