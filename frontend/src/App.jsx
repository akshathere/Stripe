import { useState } from 'react'
import './App.css'
import StripeCheckout from "react-stripe-checkout"
/*eslint-disable*/
function App() {
  const [product, setProduct] = useState({
    name:"L product",
    price: 100,
    productBy: "chamkeela shingh"
  })
  const makePayment=token=>{
    const body= {
      token,
      product
    }
    const headers = {
      "Content-type" : "application/json"
    }
    return fetch(`http://localhost:3001/payment`,{
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then((res)=>{
      console.log("response = ",res);
      const {status } =res
      console.log("Status = ",status)

    })
    .catch(error => console.log(error))
  }
  
  return (
      <div>
        <StripeCheckout stripeKey="pk_test_51PKiK6SCv05u1zKoO5jzMRRRRqgTTnrgXk0buNNjqcpFakEcBRcJAZfRVi4VlFhnfR8VuXwZEvWQW8tTu78ojfiT00Cv05OW9J" token={makePayment}
         name='buy me plz :)' amount={product.price*100} shippingAddress billingAddress >
          <button> Buy most L product for 100$</button>
        </StripeCheckout>
      </div>
  )
}

export default App
