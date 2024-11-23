'use client';

import { useEffect, useState } from 'react';

export default function BalanceCalculation(eventId: any) {

  const [memberId, setMemberId] = useState('1397');
  
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        
        const response = await fetch(`/api/event/${eventId.eventId}/members/${memberId}/balance`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

        });
        const data = await response.json();
        // Handle the fetched data
        console.log(data);
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };

    fetchMemberData();
  }, []); 


  return (
    <div>
      <h1>My Component</h1>
      {/* Your component content goes here */}
    </div>
  );
}
