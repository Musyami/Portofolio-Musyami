import FloatingSuits from './FloatingSuits';

interface PageBannerProps {
  label: string;
  title: string;
  description: string;
}

export default function PageBanner({ label, title, description }: PageBannerProps) {
  return (
    <header className="bn mv">
      <FloatingSuits count={10} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="lb">{label}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}
