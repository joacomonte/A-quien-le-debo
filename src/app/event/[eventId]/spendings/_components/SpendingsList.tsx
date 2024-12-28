'use client'

import React, { useState, useEffect } from 'react';
import UserSpendsItem from './UserSpendsItem';

interface SpendingsListProps {
  eventId: string;
}

const SpendingsList: React.FC<SpendingsListProps> = ({ eventId }) => {
  const [spendings, setSpendings] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSpendings = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/event/${eventId}/spendings`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const responseBody = await response.json();
        
        setSpendings(responseBody.data);
        console.log('spens', responseBody.data);
        setTotalAmount(calculateTotalAmount(responseBody.data));
      } catch (error) {
        console.error('Error fetching spendings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSpendings();
  }, [eventId]);

  const calculateTotalAmount = (spendings: any[]) => {
    return spendings.reduce((total, spending) => total + spending.amount, 0);
  };

  return (
    <div className="w-full flex flex-col gap-2 max-h-[40svh] overflow-scroll scroll-fade">
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse h-[60px] rounded-lg"></div>
          ))}
        </>
      ) : (
        spendings.map((spending: any) => (
          <UserSpendsItem
            key={spending.spendId}
            title={spending.title}
            amount={spending.amount}
            whoPaid={spending.spenderId}
            notes={spending.notes}
            spendId={spending.spendId}
            eventId={eventId}
          />
        ))
      )}
      <div className="pl-2 pt-2">Total: {isLoading ? 'Cargando...' : totalAmount}</div>
    </div>
  );
};

export default SpendingsList;