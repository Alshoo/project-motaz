import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeaderBefor from '@/components/Header-befor';
import Image from 'next/image';
import Head from 'next/head';
import MainWalletPage from '@/components/wallet/main';

function Walletpage() {
  return (
    <>
      <Header />

    <MainWalletPage/>

      <Footer />
    </>
  )
}

export default Walletpage
