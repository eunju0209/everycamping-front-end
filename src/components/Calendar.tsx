import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

type CalendarAppType = {
  type: string;
  setSearchDate: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
};

const CalendarApp = ({ type, setSearchDate }: CalendarAppType) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(data: Date) => {
        setStartDate(data);
        setSearchDate((prev) => {
          return {
            ...prev,
            [type]: format(data, 'yyyy-MM-dd'),
          };
        });
      }}
      locale={ko}
      dateFormat='yyyy/MM/dd'
      className='bg-inherit rounded cursor-pointer p-1 w-24'
    />
  );
};

export default CalendarApp;
