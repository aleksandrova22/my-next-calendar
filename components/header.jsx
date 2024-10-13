import Link from "next/link";
import styles from '@/styles/header.module.css';

const
  pages = [
    { href: '/', title: 'Home' },
    { href: 'get-calendar', title: 'Calendar' }
  ];

export function Header() {
   return <>
    <nav className={styles.main}>
      <ul>
        {pages.map(({ href, title }) =>
          <li key={href}>
          
            <Link href={href}> {title} </Link>
          </li>)}
      </ul>
    </nav>
  </>;
}