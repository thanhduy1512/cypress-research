import { FormEvent, useRef } from 'react';
import styles from './Sigin.module.css';

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmitSigin = (e: FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username);
    console.log(password);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Signin to your account</h1>
        <form onSubmit={onSubmitSigin} className={styles.modalContainer}>
          <label>Username</label>
          <input type="text" ref={usernameRef} />
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordRef} />

          <button type="submit">Signin</button>
        </form>
      </div>
    </div>
  );
};
export default Signin;
