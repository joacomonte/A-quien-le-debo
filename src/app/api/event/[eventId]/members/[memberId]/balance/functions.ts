import { supabase } from '@/app/lib/supabaseClient';


export async function getEventMembersBalance(eventId: string) {
  try {
    // Fetch all members for the given eventId
    const { data: members, error: membersError } = await supabase
      .from("Members")
      .select("memberId, memberName")
      .eq("eventId", eventId);

    if (membersError) {
      throw new Error(`Error fetching members: ${membersError.message}`);
    }

    const membersBalance = await Promise.all(
      members.map(async (member) => {
        const { memberId, memberName } = member;
        const balance = await getMemberBalance(eventId, memberId);
        return { name: memberName, balance };
      })
    );

    return membersBalance;
  } catch (error) {
    console.error('Error calculating members balance:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}


export async function getMemberBalance(eventId: string, memberId: string) {
  let memberSpent: number = 0;

  if (eventId === undefined || memberId === undefined) return { error: 'eventId and memberId are required' };

  try {
    // prettier-ignore
    const { data, error } = await supabase
      .from("Spendings")
      .select("amount")
      .eq("spenderId", memberId)
      .eq("eventId", eventId);

    // Calculate substract of amounts
    memberSpent = data?.reduce((substract, record) => substract - (record.amount || 0), 0) || 0;

    // Step 1: Fetch rows from spendConsumers for the given memberId
    // prettier-ignore
    const { data: spendConsumers, error: consumersError } = await supabase
      .from("spendConsumers")
      .select("spendId")
      .eq("memberId", memberId);

    if (consumersError) {
      throw new Error(`Error fetching spendConsumers: ${consumersError.message}`);
    }

    let totalShare = 0;

    // Step 2: Process each spendId to calculate the share
    for (const { spendId } of spendConsumers) {
      // Count rows for the current spendId
      // prettier-ignore

      const { data: consumerCount, error: countError } = await supabase
        .from("spendConsumers")
        .select("id", { count: "exact" }) // Use `count: "exact"` to get row count
        .eq("spendId", spendId);

      if (countError) {
        throw new Error(`Error counting consumers for spendId ${spendId}: ${countError.message}`);
      }

      const count = consumerCount.length;

      // Fetch the amount from Spendings table for the current spendId
      // prettier-ignore
      const { data: spending, error: spendingError } = await supabase
        .from("Spendings")
        .select("amount")
        .eq("spendId", spendId)
        .single(); // Single since spendId is unique

      if (spendingError) {
        throw new Error(`Error fetching amount for spendId ${spendId}: ${spendingError.message}`);
      }

      const amount = spending.amount;

      // Add the calculated share to the total
      if (count > 0) {
        totalShare += amount / count;
      }
    }

    console.log(`Total share for memberId ${memberId}: ${totalShare}`);

    const totalOwed = totalShare + memberSpent;
    return totalOwed;
  } catch (error) {
    console.error('Error calculating total spendings:', error);
    return {
      totalAmount: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
