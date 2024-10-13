import { useState, memo, useCallback, useRef } from 'react';
import styles from '@/styles/form.module.css';
import Calendar from './Calendar';

export const Form = memo(function () {
  const
    ref = useRef(''),
    [value, setValue] = useState('2024-07-24');
  ref.current = value;
  console.debug('Form render', value);
  return <fieldset>
    <legend>Form</legend>

    <input value={value} type="date" id="start" name="trip" min="2010-01-01" max="2030-12-31" onInput={event => setValue(event.target.value)} />
    <hr />
    <div className={styles.calendar}> Дата: {value}  </div>
    <Calendar props={value.split('-')} />
  </fieldset>


});