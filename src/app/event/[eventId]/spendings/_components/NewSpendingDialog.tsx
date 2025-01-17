'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type NewSpendProps = {
  eventId: string;
  onDataChange: () => void;
};

export default function NewSpendingDialog({
  eventId,
  onDataChange: triggerParentUpdate,
}: NewSpendProps) {
  const [allMembers, setAllMembers] = useState<Member[] | null>(null);

  const [consumers, setConsumers] = useState<Member[]>([]);

  const [whoPaid, setWhoPaid] = useState<Member | null>(null);

  const [title, setTitle] = useState<string>('');

  const [notes, setNotes] = useState<string>('');

  const [amount, setAmount] = useState<string>('');

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const [step, setStep] = useState<number>(0);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function getAllMembers() {
      const response = await fetch(`/api/event/${eventId}/members`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseBody: ApiResponse<Member[]> = await response.json();

      if (responseBody.message === 'OK') {
        const allMembers = responseBody.data.map((member: Member) => member);
        setAllMembers(allMembers);
        setConsumers(allMembers);
      }
    }

    getAllMembers();
  }, [eventId]);

  useEffect(() => {
    (inputRef.current ?? areaRef.current)?.focus();
  }, [step]);

  async function submitSpend() {
    setSubmitButtonLoading(true);
    const response = await fetch(`/api/event/${eventId}/spendings`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spenderId: whoPaid?.memberId,
        consumers: consumers.map((consumer) => consumer.memberId),
        title: title,
        amount: amount,
        notes: notes,
      }),
    });
    const responseBody = await response.json();

    if (responseBody.status === 'OK') {
      setConsumers([]);
      setWhoPaid(null);
      setTitle('');
      setNotes('');
      setAmount('');
      setSubmitButtonLoading(false);

      dialogRef?.current?.close();
      toast.success('Spending added successfully!');
      triggerParentUpdate();
    } else {
      toast.error('Failed to add spending. Please try again.');
    }
  }

  const toggleSelectAll = () => {
    if (consumers?.length === 0 && allMembers) {
      setConsumers([...allMembers]);
    } else {
      setConsumers([]);
    }
  };

  function inputAmount(e: any) {
    const input = e.target.value;
    if (/^\d*\.?\d*$/.test(input)) {
      setAmount(input);
    }
  }

  const handleStepChange = (increment: boolean) => {
    setStep((prevStep) =>
      Math.max(0, Math.min(5, prevStep + (increment ? 1 : -1)))
    );
  };

  return (
    <>
      <button
        className='w-full rounded-lg text-sm font-medium text-gray-900 min-h-[60px] h-[60px] text-center border-2 border-gray-100 mb-2'
        onClick={() => dialogRef?.current?.showModal()}>
        <span>Agregar un gasto</span>
      </button>

      <dialog
        ref={dialogRef}
        className=' h-full max-w-[500px] max-h-[90vh] w-full touch-none px-4'>
        <h2 className='text-sm text-gray-400 text-center my-4'>
          Paso {step + 1} / 5
        </h2>
        {step === 0 && (
          <div className='w-full h-[35svh] '>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              id='first_name'
              className='w-full text-xl font-medium outline-none py-4'
              placeholder='Titulo del gasto. Ej: Gaseosas'
              required
              ref={inputRef}
            />
          </div>
        )}

        {step === 1 && (
          <div className='w-full h-[35svh]'>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              ref={areaRef}
              id='notes'
              className='w-full text-xl font-medium outline-none py-4'
              placeholder='(Opcional) Descripción. Ej: 3 Cocas.'
              required></textarea>
          </div>
        )}

        {step === 2 && (
          <div className='w-full h-[35svh]'>
            <div className='flex gap-1 items-center'>
              {amount && <p className='text-xl text-gray-900'>$</p>}
              <input
                type='text'
                id='amount'
                value={amount}
                onChange={inputAmount}
                className='w-full text-xl font-medium outline-none py-4'
                placeholder='Cuanto salió? Ej: 100.50'
                required
                ref={inputRef}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <>
            <div className='w-full h-[75svh]'>
              <p className='w-full text-xl font-medium outline-none ml-1 py-4'>
                {whoPaid ? (
                  <span>
                    Pagó{' '}
                    <span className='text-black'>{whoPaid.memberName}</span>
                  </span>
                ) : (
                  <span className='text-gray-400'>Quien pago?</span>
                )}
              </p>

              <div className='h-[62svh] overflow-scroll scroll-fade'>
                {allMembers && (
                  <ul>
                    {allMembers.map((member) => (
                      <li
                        key={member.memberId}
                        onClick={() => setWhoPaid(member)}
                        className='flex items-center cursor-pointer'>
                        {whoPaid?.memberId === member.memberId && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={2}
                            stroke='currentColor'
                            className='size-4 mr-1 text-green-500'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m4.5 12.75 6 6 9-13.5'
                            />
                          </svg>
                        )}
                        {member.memberName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className='w-full h-[75svh]'>
              <p
                className={`w-full text-xl font-medium outline-none ml-1 py-4 ${consumers.length > 0 ? 'text-black' : 'text-gray-400'}`}>
                {consumers.length === 0
                  ? 'Entre quienes se divide?'
                  : `Se divide entre ${consumers.length}`}
              </p>

              <div className='h-[55svh] overflow-scroll scroll-fade'>
                {allMembers && (
                  <ul>
                    <li
                      onClick={toggleSelectAll}
                      className='flex items-center text-gray-500 cursor-pointer'>
                      {consumers.length === allMembers.length && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-4 mr-2 text-green-500'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m4.5 12.75 6 6 9-13.5'
                          />
                        </svg>
                      )}
                      Seleccionar/Deseleccionar todos
                    </li>
                    {allMembers.map((member) => (
                      <li
                        key={member.memberId}
                        onClick={() => {
                          setConsumers((prevConsumers) => {
                            const isSelected = prevConsumers.some(
                              (c) => c.memberId === member.memberId
                            );

                            const updatedConsumers = new Set(
                              prevConsumers.map((c) => c.memberId)
                            ); // Use a new set to prevent duplicate entries or stale state issues

                            if (isSelected) {
                              updatedConsumers.delete(member.memberId);
                            } else {
                              updatedConsumers.add(member.memberId);
                            }
                            return allMembers.filter((m) =>
                              updatedConsumers.has(m.memberId)
                            );
                          });
                        }}
                        className={`flex items-center cursor-pointer w-full ${
                          consumers.some((c) => c.memberId === member.memberId)
                            ? 'text-green-700'
                            : 'text-gray-500'
                        }`}>
                        {consumers.some(
                          (c) => c.memberId === member.memberId
                        ) && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={2}
                            stroke='currentColor'
                            className='size-4 mr-1 text-green-500'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m4.5 12.75 6 6 9-13.5'
                            />
                          </svg>
                        )}
                        {member.memberName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}

        <div className='flex gap-4 w-full'>
          <button
            onClick={() => dialogRef?.current?.close()}
            className='w-2/10 rounded-lg py-6 px-4 bg-gray-100 text-gray-600 cursor-pointer'>
            Cerrar
          </button>

          <div
            className={`w-2/10 rounded-lg py-6 px-6 bg-green-100 text-green-800 cursor-pointer ${
              step === 0 ? ' !cursor-not-allowed bg-gray-200 text-gray-800' : ''
            }`}
            onClick={(e) => {
              if (step !== 0) {
                handleStepChange(false);
              } else {
                e.preventDefault();
              }
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
              />
            </svg>
          </div>

          {step < 4 && (
            <div
              className='w-full rounded-lg py-6 px-6 bg-green-100 text-green-800 cursor-pointer flex justify-center gap-6 pr-8'
              onClick={() => handleStepChange(true)}>
              <p>Siguiente</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                />
              </svg>
            </div>
          )}

          {step === 4 && (
            <button
              type='button'
              className={`w-full rounded-lg py-6 px-6 bg-green-600 text-green-50 cursor-pointer flex justify-center gap-6 pr-8' ${submitButtonLoading ? 'bg-green-200 text-green-600 cursor-not-allowed' : 'bg-green-100 text-green-900 hover:bg-green-700'}`}
              onClick={submitSpend}
              disabled={submitButtonLoading}>
              {submitButtonLoading ? 'Cargando...' : 'Guardar'}
            </button>
          )}
        </div>
      </dialog>
    </>
  );
}
