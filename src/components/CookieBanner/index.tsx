import React, { useEffect, useState } from 'react';
import './styles.scss';

export const CookieBanner = () => {
  const [ accepted, setAccepted ] = useState(false);

  useEffect(() => {
    const storageAccepted = localStorage.getItem('cookies:accepted') === 'true'

    if (storageAccepted) {
      setAccepted(storageAccepted)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cookies:accepted', accepted ? 'true' : 'false')
  }, [accepted])

  if (accepted) {
    return null
  }

  return <>
    <div className='cookie-banner'>
      <p className='title'>
        We use cookies
      </p>
      <p className='description'>
        If you continue browsing, we consider that you have accepted <a href='https://neon-labs.org/cookie-policy' rel='noopener noreferrer' target='_blank'>cookies policy</a>.
      </p>
      <div className='actions'>
        <button onClick={() => setAccepted(true)}>Accept</button>
      </div>
    </div>
  </>
}

export default CookieBanner
