import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PaymentProcessPage from '@/components/wallet/paymentProcessPage';

function PayPage  () {
  return (
    <div>
      <Header/>


<div  className= "flex gap-[15vh] flex-col ">
    <PaymentProcessPage className="flex items-center" />

      <Footer />
</div>
    </div>
  )
}

export default PayPage
