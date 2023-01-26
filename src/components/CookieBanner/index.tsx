import React, { useCallback, useEffect, useMemo, useState } from "react";
import './styles.scss';

const COOKIES_EXPIRE = 'cookies:expire';
const COOKIES_ACCEPTED = 'cookies:accepted';

export const CookieBanner = () => {
  const [ show, setShow ] = useState(false);

  const isPostponeExpired = useMemo<boolean>(() => {
    const expire = localStorage.getItem(COOKIES_EXPIRE);

    if (expire) {
      return Math.abs(Number(expire) - new Date().getTime()) / 36e5 > 24;
    }

    return true;
  }, []);

  useEffect(() => {
    setShow(isPostponeExpired && !JSON.parse(localStorage.getItem(COOKIES_ACCEPTED)));
  }, [isPostponeExpired]);

  const accept = useCallback(() => {
    setShow(false);
    localStorage.setItem(COOKIES_ACCEPTED, 'true');
    localStorage.removeItem(COOKIES_EXPIRE);
  }, []);

  const postpone = useCallback(() => {
    setShow(false);
    localStorage.setItem(COOKIES_ACCEPTED, 'false');
    localStorage.setItem(COOKIES_EXPIRE, new Date().getTime().toString())
  }, [])

  if (show) {
    return <>
      <div className='cookie-banner'>
        <p className='title'>
          We use cookies
        </p>
        <p className='description'>
          If you continue browsing, we consider that you have accepted <a href='https://neon-labs.org/cookie-policy' rel='noopener noreferrer' target='_blank'>cookies policy</a>.
        </p>
        <div className='actions'>
          <button onClick={accept}>Accept</button>
          <button className='secondary' onClick={postpone}>Ask me later</button>
        </div>
      </div>
    </>
  }

  return null;
}

export default CookieBanner
