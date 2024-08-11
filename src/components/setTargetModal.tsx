import React, { useContext, useEffect, useState } from 'react';
import { Modal, ModalProps } from './modal';
import { Input } from './input';
import { StoreContext } from '../contexts/storeContext';
import { Form } from './form';
import { Submit } from './submit';

export interface SetTargetModalProps
  extends Pick<ModalProps, 'open' | 'onDismiss'> {
  onSubmit: (target: number) => unknown;
}

export function SetTargetModal(props: SetTargetModalProps) {
  const storeContext = useContext(StoreContext);
  const [target, setTarget] = useState<string>('0');

  useEffect(() => {
    setTarget(`${storeContext.store.target}`);
  }, [props.open]);

  return (
    <Modal
      title={'Set Monthly Goal'}
      subtitle={'Choose how much you want to spend in a month'}
      open={props.open}
      onDismiss={props.onDismiss}
    >
      <Form
        onSubmit={() => {
          const newTarget = parseFloat(target);
          if (!isNaN(newTarget)) {
            props.onSubmit(newTarget);
          }
        }}
      >
        <Input
          type={'number'}
          size={'lg'}
          label={'Monthly Goal'}
          value={target}
          onChange={setTarget}
          autoFocus={true}
        />
        <Submit />
      </Form>
    </Modal>
  );
}
