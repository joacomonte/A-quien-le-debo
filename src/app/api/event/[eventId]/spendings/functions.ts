import { supabase } from "@/app/lib/supabaseClient";

export async function addSpending(
  eventId: string,
  spenderId: string,
  title: string,
  amount: number,
  notes: string,
) {
  return await supabase.from("Spendings").insert({
    eventId: eventId,
    spenderId: spenderId,
    title: title,
    amount: amount,
    notes: notes,
  });
}
