import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
      <main className={styles.main}>
        <div className={styles.description} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
          <div>
            <Link href="/login">
              <button style={{ fontSize: '3vh', padding: '15px 30px', borderRadius: '8px', background: '#007bff', color: '#fff'}}>Continue to OpusAI</button>
            </Link>
          </div>
        </div>
      </main>
  );
}
