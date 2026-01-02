import { useEffect } from 'react';
import { pingBE } from './api/test.api';

function App() {
  useEffect(() => {
    pingBE()
      .then((res) => {
        console.log('BE response:', res);
      })
      .catch((err)    => {
        console.error('BE error:', err);
      });
  }, []);

  return <div>Connect thanh cong</div>;
}

export default App;
