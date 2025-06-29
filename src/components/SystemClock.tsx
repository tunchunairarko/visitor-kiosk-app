'use client';

import { useState, useEffect } from 'react';
import {Clock} from 'lucide-react';
import { ClientOnly } from './ClientOnly';

const SystemClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <ClientOnly>
      <div className="flex flex-row items-center gap-2 text-sm font-medium">
        <Clock className="h-4 w-4 text-gray-500" />
        {date.toLocaleTimeString()}
      </div>
    </ClientOnly>
  );
}

export default SystemClock
