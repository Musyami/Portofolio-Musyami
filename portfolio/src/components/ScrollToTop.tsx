'use client';

export default function ScrollToTop() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="up"
      type="button"
      aria-label="Kembali ke atas"
      onClick={handleClick}
    >
      ▲
    </button>
  );
}
