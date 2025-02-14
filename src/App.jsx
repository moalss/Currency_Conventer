

import './App.css'
import CurrencyConventer from "./Components/CurrencyConventer.jsx";

function App() {
  /* curl -s https://api.frankfurter.dev/v1/latest */
  /* curl -s https://api.frankfurter.dev/v1/currencies */
  //https://api.frankfurter.dev/v1/latest?amount=1&base=USD&symbols=INR
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
    <div className="container"> <CurrencyConventer/></div>

      </div>
    </>
  )
}

export default App
