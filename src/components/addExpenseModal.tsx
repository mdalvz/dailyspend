import React, { useEffect, useState } from 'react';
import { Modal, ModalProps } from './modal';
import { Input } from './input';
import { Form } from './form';
import { Submit } from './submit';

export interface AddExpenseModalProps
  extends Pick<ModalProps, 'open' | 'onDismiss'> {
  onSubmit: (amount: number) => unknown;
}

export function AddExpenseModal(props: AddExpenseModalProps) {
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    setAmount('');
  }, [props.open]);

  return (
    <Modal
      title={'Add Expense'}
      subtitle={'Enter the amount that was spent'}
      open={props.open}
      onDismiss={props.onDismiss}
    >
      <Form
        onSubmit={() => {
          const newAmount = parseFloat(amount);
          if (!isNaN(newAmount)) {
            props.onSubmit(newAmount);
          }
        }}
      >
        <Input
          type={'number'}
          size={'lg'}
          label={'Amount'}
          value={amount}
          onChange={setAmount}
          autoFocus={true}
        />
        <Submit />
      </Form>
    </Modal>
  );
}
