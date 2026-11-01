'use client';

import { useState, useEffect } from 'react';

// Custom event untuk trigger toast dari mana saja
export function showToast(message: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('app:toast', { detail: message }));
  }
}

export default function Toast() {
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setMessage(customEvent.detail || '');
      setVisible(true);

      clearTimeout(timer);
      timer = setTimeout(() => {
        setVisible(false);
      }, 2800);
    };

    window.addEventListener('app:toast', handleToast);
    return () => {
      window.removeEventListener('app:toast', handleToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      id="toast"
      role="status"
      className={visible ? 'show' : ''}
    >
      {message}
    </div>
  );
}
