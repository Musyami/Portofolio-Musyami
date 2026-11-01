'use client';

import { useState } from 'react';
import { showToast } from './Toast';

export default function JokerForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast('♠ Pesan terkirim. Kartu sudah dibagikan!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="face jk deal in">
      <span className="vt gd" style={{ left: '8px' }}>
        JOKER
      </span>
      <span className="vt gd" style={{ right: '8px' }}>
        JOKER
      </span>

      <div className="tp">🃏</div>
      <h2>The Joker Card</h2>
      <p className="sb">
        Punya ide, proyek, atau mau ngobrol robotika? Tarik kartu ini.
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Nama
          <input
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Pesan
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button className="bt p" type="submit">
          ♠ Kirim Pesan
        </button>
      </form>
    </div>
  );
}
