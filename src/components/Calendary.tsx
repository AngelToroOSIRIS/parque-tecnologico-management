"use client"

import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyApp() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar className="bg-green w-[70%] mx-auto mb-20" onChange={onChange} value={value} />
    </div>
  );
}