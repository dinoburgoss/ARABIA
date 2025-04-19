import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const useConfig = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'config', 'datosGenerales');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setConfig(docSnap.data());
      }
    };
    fetchData();
  }, []);

  return config;
};

export default useConfig;
