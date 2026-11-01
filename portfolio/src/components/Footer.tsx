import Link from 'next/link';
import { SOC } from '@/lib/fallback-data';

export default function Footer() {
  return (
    <footer id="ft">
      <div className="ftop">
        <div>
          <Link href="/" className="lo">
            <b>A♠</b>
            <span>Musyami</span>
          </Link>
          <p className="ftg">
            Mahasiswa ITS yang membangun web interaktif dan belajar robotika. Punya ide seru?
            Yuk, kita wujudkan bersama!
          </p>
          <div className="fs">
            {SOC.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                dangerouslySetInnerHTML={{ __html: s.iconSvg || '' }}
              />
            ))}
          </div>
        </div>

        <div>
          <h4>Kontak</h4>
          <ul>
            <li>
              <a href="mailto:musyami.20@gmail.com">musyami.20@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="fbot">
        <span>© 2026 All rights reserved. Muhammad Rasya Islami</span>
      </div>
    </footer>
  );
}
