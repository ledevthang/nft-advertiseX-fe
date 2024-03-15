import * as React from 'react';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

interface ITimePicker {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

export default function TimePicker({ value, onChange }: ITimePicker) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        label="DateTimePicker"
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
