import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PaymentProcessPage from '@/components/wallet/paymentProcessPage';

function PayPage  () {
  return (
    <div>
      <Header/>


<div  className= "flex gap-[7.8vh] flex-col">
    <PaymentProcessPage />

      <Footer />
</div>
    </div>
  )
}

export default PayPage
