import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import styles from './styles/modules/app.module.scss';

// Components
import PageTitle from './components/PageTitle';
import Header from './components/Header';
import AppContent from './components/AppContent';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <PageTitle />
        <div className={styles.app__wrapper}>
          <Header />
          <AppContent />
        </div>
      </div>
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </div>
  );
}

export default App;
