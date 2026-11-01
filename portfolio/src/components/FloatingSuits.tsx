interface FloatingSuitsProps {
  count?: number;
}

const SUITS = ['♠', '♥', '♦', '♣'];
const COLORS = ['#B8483E', '#C5A059', '#4A7C59'];

// Fungsi pseudo-random deterministik untuk menghindari mismatch SSR
function pseudoRandom(n: number): number {
  return (((n * 9301) % 233280) % 1000) / 1000;
}

export default function FloatingSuits({ count = 12 }: FloatingSuitsProps) {
  return (
    <div className="fx" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const left = pseudoRandom(i + 1) * 100;
        const fontSize = 18 + pseudoRandom(i + 4) * 40;
        const color = COLORS[i % 3];
        const duration = 16 + pseudoRandom(i + 7) * 20;
        const delay = -pseudoRandom(i + 9) * 30;
        const suit = SUITS[i % 4];

        return (
          <i
            key={i}
            style={{
              left: `${left}%`,
              fontSize: `${fontSize}px`,
              color,
              opacity: 0.22,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            {suit}
          </i>
        );
      })}
    </div>
  );
}
