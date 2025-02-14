import {useEffect, useState} from "react";
import Dropdown from "./Dropdown.jsx";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";

const CurrencyConventer = () => {

    const [currencies, setCurrencies] = useState([])
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR")
    const [converting, setConverting] = useState(false)
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [favorite, setFavorite] = useState(JSON.parse(localStorage.getItem("favorite"))||["EUR","USD"]);

    const fetchCurrencies= async ()=>{
        try {
            const res= await fetch("https://api.frankfurter.dev/v1/currencies");
            const data=  await res.json();

            setCurrencies(Object.keys(data));

        }catch (error){
            console.log("Fetching Error", error);
        }
    }

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const convertCurrency= async ()=>{
    try {
       const resp = await fetch(`https://api.frankfurter.dev/v1/latest?base=${fromCurrency}&symbols=${toCurrency}`)
        const data =await resp.json();
           setConvertedAmount((amount * data.rates[toCurrency]).toFixed(2)+" "+ toCurrency);


    }catch (error){
        console.log(error)
    }finally {
        setConverting(false)
    }
    }
    const handleFavorite=(currency)=>{
        let updatedFavorite

        if(favorite.includes(currency)){
            updatedFavorite=favorite.filter(e=>e!==currency);

        }else {
            updatedFavorite=[...favorite,currency];
        }
        setFavorite(updatedFavorite);
        localStorage.setItem("favorite", JSON.stringify(updatedFavorite));

    }
    const swappCurrency=()=>{
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }


    return (
        <div className="  shadow-md max-w-xl h-full my-10 mx-auto bg-white rounded-lg p-5 ">
            <h2 className="  text-5xl text-gray-700 font-semibold mb-5">Currency Conventer</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3  items-end gap-4 ">

                <Dropdown  currencies ={currencies}  title="From:"   favorite={favorite} handleFavorite={handleFavorite} curency={fromCurrency} setCurency={setFromCurrency}/>

                <div className="flex justify-center -mb-5 sm:mb-0  ">
                    <button onClick={swappCurrency} className=" rounded-full bg-gray-200  p-2 hover:bg-gray-300   " ><HiOutlineArrowPathRoundedSquare  className=" text-xl text-gray-700"/> </button>
                </div>

                <Dropdown currencies ={currencies}  title="To:"  favorite={favorite}   handleFavorite={handleFavorite} curency={toCurrency} setCurency={setToCurrency}/>
            </div>


            <div className="mt-4">
                <label htmlFor="amount" className="text-gray-700 text-sm font-medium block">amount:</label>
                <input value={amount} onChange={e=>setAmount(e.target.value)} type="number"  id="amount" className="w-full  p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 mt-1 "/>
                
            </div>

            <div className="flex justify-end mt-6">
                <button onClick={convertCurrency} className=" px-5 py-2  text-white bg-indigo-600 rounded-lg  focus:ring-2 focus:outline-none  focus:ring-indigo-500  focus:ring-offset-2  hover:bg-indigo-700  ">Convert</button>
            </div>
            {convertedAmount&& <div
                className={`block font-medium text-green-700 mt-4 text-right text-lg ${converting ? "animate-spin" : ""}  cursor-pointer`}>
                Converted Amount: {convertedAmount}
            </div>}

        </div>
    );
};

export default CurrencyConventer;