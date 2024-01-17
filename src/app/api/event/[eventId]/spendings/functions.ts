import { supabase } from "@/app/lib/supabaseClient";

export async function addSpending(
  eventId: string,
  spenderId: string,
  title: string,
  amount: number,
  notes: string,
) {
  try {
    const res = await supabase
      .from("Spendings")
      .insert({
        eventId: eventId,
        spenderId: spenderId,
        title: title,
        amount: amount,
        notes: notes,
      })
      .select();
    console.log("res de add spending", res);

    return res;
  } catch (error) {
    console.error("Error adding spending:", error);
    throw error;
  }
}

export async function linkSpendingToConsumers(
  spendId: string,
  membersId: string[],
) {
  // Prepare the data to be inserted
  const spendConsumersData = membersId.map((memberId) => ({
    spendId: parseInt(spendId),
    memberId: parseInt(memberId),
  }));

  console.log("array", spendConsumersData);

  // Use upsert to insert multiple rows
  try {
    // Assuming the table name is "spendConsumers"
    const res = await supabase
      .from("spendConsumers")
      .upsert(spendConsumersData);
    console.log("link", res);

    return res;
  } catch (error) {
    console.error("Error adding spending:", error);
  }
}

export async function getSpendings(eventId: string) {
  try {
    const res = await supabase
      .from("Spendings")
      .select()
      .eq("eventId", eventId);

    return res;
  } catch (error) {
    console.error("Error getting spendings:", error);
    throw error;
  }
}
