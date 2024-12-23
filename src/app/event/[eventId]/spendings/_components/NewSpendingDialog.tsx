'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';

import ChevronUpDownIcon from '@heroicons/react/20/solid/ChevronUpDownIcon';
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
  FloatingPortal,
  size,
} from '@floating-ui/react';

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

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenWhoPaid, setIsOpenWhoPaid] = useState(false);

  const [whoPaid, setWhoPaid] = useState<Member | null>(null);

  const [title, setTitle] = useState<string>('');

  const [notes, setNotes] = useState<string>('');

  const [amount, setAmount] = useState<string>('');

  const [query, setQuery] = useState('');

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const [step, setStep] = useState<number>(0);

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
        setAllMembers(responseBody.data.map((member: Member) => member));
        console.log(
          'members',
          responseBody.data.map((member: Member) => member)
        );
      }
    }

    getAllMembers();
  }, [eventId]); // Dependency array with eventId

  async function submitSpend() {
    setSubmitButtonLoading(true);
    const response = await fetch(`/api/event/${eventId}/spendings`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spenderId: whoPaid,
        consumers: consumers.map((consumer) => consumer.memberId),
        title: title,
        amount: amount,
        notes: notes,
      }),
    });
    const responseBody = await response.json();

    if (responseBody.data.status === 201) {
      setConsumers([]);
      setWhoPaid(null);
      setTitle('');
      setNotes('');
      setAmount('');
      setQuery('');
      setSubmitButtonLoading(false);

      closeModal();
      toast.success('Spending added successfully!');
      triggerParentUpdate();
    } else {
      toast.error('Failed to add spending. Please try again.');
    }
  }

  const filteredPeople =
    query === ''
      ? allMembers
      : allMembers?.filter((person) =>
          person.memberName
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const toggleSelectAll = () => {
    if (consumers?.length === 0 && allMembers) {
      setConsumers([...allMembers]);
    } else {
      setConsumers([]);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function inputAmount(e: any) {
    const input = e.target.value;
    // Validate input to allow only numbers and one decimal point
    if (/^\d*\.?\d*$/.test(input)) {
      setAmount(input);
    }
  }

  const { refs, floatingStyles, context } = useFloating({
    placement: 'top',
    open: isOpenWhoPaid,
    onOpenChange: setIsOpenWhoPaid,
    middleware: [
      offset(15),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  const inputRef = useRef<HTMLInputElement>(null);

  function clickfocus() {
    inputRef.current?.focus();
    inputRef.current?.click();
  }

  useEffect(() => {
    if (isOpen && step === 0) {
     setTimeout(() => {
        inputRef.current?.focus();
        // inputRef.current?.click();
        // inputRef.current?.blur();
        console.log('a', inputRef.current);
        
      }, 1000);
    }
  }, [step, isOpen]);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog
        open={isOpen}
        onClose={() =>{
          setIsOpen(false);
          setStep(0);
        } 
      }
        className='relative z-50'>
        <DialogBackdrop className='fixed inset-0 bg-black/30' />
        <div className='fixed inset-0 flex w-screen items-start justify-center'>
          <DialogPanel className='w-[100svh] max-h-[800px] h-full flex flex-col justify-between max-w-[500px] space-y-4 border bg-white p-4'>
            {step === 0 && (
              <div className='w-full' >
                <div onClick={clickfocus}>aklsjhdasjklh</div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type='text'
                  id='first_name'
                  className='w-full text-lg font-medium focus:border-gray-500 outline-none py-4'
                  placeholder='Titulo del gasto. Ej: Gaseosas'
                  required
                  ref={inputRef}
                />
              </div>
            )}
            {step === 1 && (
              <div className='w-full '>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  id='notes'
                  className='w-full text-sm font-normal outline-none pt-2 '
                  placeholder='(Opcional) Descripción. Ej: 3 Cocas.'
                  required></textarea>
              </div>
            )}

            {step === 2 && (
              <div className='flex gap-4'>
                <div className='flex items-center max-w-[170px]'>
                  {amount && <p className='text-sm text-gray-900'>$</p>}
                  <input
                    type='text'
                    id='amount'
                    value={amount}
                    onChange={inputAmount}
                    className='w-fit focus:outline-none rounded-lg text-sm text-gray-900'
                    placeholder='Cuanto salió? Ej: 100.50'
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <>
                <div className='w-full'>
                  <input
                    ref={refs.setReference}
                    {...getReferenceProps()}
                    value={whoPaid?.memberName}
                    type='text'
                    id='whoPaid'
                    className='w-fit focus:outline-none rounded-lg text-sm text-gray-900'
                    placeholder='Quién pagó?'
                    onTouchStart={() => {
                      setIsOpenWhoPaid(true);
                    }}
                    onClick={(e) => {
                      setIsOpenWhoPaid(true);
                      e.currentTarget.focus();
                    }}
                    required
                  />
                </div>

                {isOpenWhoPaid && (
                  <FloatingFocusManager context={context} modal={true}>
                    <div
                      className=' shadow-md min-w-44 max-h-[30vh] overflow-y-auto bg-white z-20 search-bar'
                      ref={refs.setFloating}
                      style={{
                        ...floatingStyles,
                      }}
                      aria-labelledby={headingId}
                      {...getFloatingProps()}>
                      {allMembers && (
                        <ul>
                          {allMembers.map((member) => (
                            <li key={member.memberId}>{member.memberName}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </FloatingFocusManager>
                )}
              </>
            )}

            {step === 4 && (
              <>
                <Listbox
                  value={consumers}
                  onChange={(v) => setConsumers(v)}
                  multiple>
                  <div className='relative z-1'>
                    <div className='relative w-fit min-w-[210px] cursor-default overflow-hidden text-left py-4 '>
                      <ListboxButton className='w-fit border-none text-left text-sm leading-5 text-gray-900 '>
                        <span className='block truncate text-gray-400'>
                          Entre quienes se divide?
                        </span>
                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                          <ChevronUpDownIcon
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                        </span>
                      </ListboxButton>
                    </div>
                    <Transition
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                      afterLeave={() => setQuery('')}>
                      <ListboxOptions className='absolute z-1 top-full mb-1 max-h-[230px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm origin-bottom'>
                        {query === '' && (
                          <div
                            onClick={toggleSelectAll}
                            className='relative cursor-default select-none py-2 pl-10 pr-4 font-medium hover:bg-green-50'>
                            {consumers.length === 0
                              ? 'Seleccionar todos'
                              : 'Deseleccionar todos'}
                            {consumers.length === allMembers?.length ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
                                <CheckIcon
                                  className='h-5 w-5 text-green-600'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </div>
                        )}
                        {allMembers?.length === 0 && (
                          <div className='relative cursor-default select-none py-2 pl-10 pr-4'>
                            Sin coincidencias
                          </div>
                        )}
                        {allMembers?.map((person, personIdx) => (
                          <ListboxOption
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-50  text-green-900' : 'text-gray-900'}`
                            }
                            value={person}>
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                  {person.memberName}
                                </span>
                                {selected ? (
                                  <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
                                    <CheckIcon
                                      className='h-5 w-5 text-green-600'
                                      aria-hidden='true'
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>

                {consumers.length > 0 && (
                  <div className='no-scrollbar items-baseline flex w-full gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
                    <p className='text-gray-400 text-sm'>Seleccionados: </p>
                    {consumers.map((p, i) => (
                      <span
                        key={i}
                        className=' my-1 whitespace-nowrap rounded-full bg-green-100 text-green-700 px-3 py-[4px] text-sm font-medium dark:bg-gray-700 dark:text-gray-300'>
                        {p.memberName}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}

            <div
              className={`w-full flex justify-center rounded-md border border-transparent px-4 py-4 cursor-pointer font-medium outline-none focus:outline-none focus-visible:ring-2 ${submitButtonLoading ? 'bg-green-200 text-green-600 cursor-not-allowed' : 'bg-green-100 text-green-900 hover:bg-green-200'}`}
              onClick={() => {
                setStep(step + 1);
              }}>
              Siguiente
            </div>
            <div
              className={`w-full flex justify-center rounded-md border border-transparent px-4 py-4 cursor-pointer font-medium outline-none focus:outline-none focus-visible:ring-2 ${submitButtonLoading ? 'bg-green-200 text-green-600 cursor-not-allowed' : 'bg-green-100 text-green-900 hover:bg-green-200'}`}
              onClick={() => {
                setStep(step - 1);
              }}>
              Volver
            </div>
            <div
              className={`w-full flex justify-center rounded-md border border-transparent px-4 py-4 cursor-pointer font-medium outline-none focus:outline-none focus-visible:ring-2 ${submitButtonLoading ? 'bg-green-200 text-green-600 cursor-not-allowed' : 'bg-green-100 text-green-900 hover:bg-green-200'}`}
              onClick={() => {
                setIsOpen(false);
              }}>
              Cancelar
            </div>

            {step === 5 && (
              <button
                type='button'
                className={`w-full flex justify-center rounded-md border border-transparent px-4 py-4  font-medium outline-none focus:outline-none focus-visible:ring-2 ${submitButtonLoading ? 'bg-green-200 text-green-600 cursor-not-allowed' : 'bg-green-100 text-green-900 hover:bg-green-200'}`}
                onClick={submitSpend}
                disabled={submitButtonLoading}>
                {submitButtonLoading ? 'Cargando...' : 'Guardar'}
              </button>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
