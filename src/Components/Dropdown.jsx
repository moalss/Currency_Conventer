
import { HiOutlineStar } from "react-icons/hi2";
import {HiStar} from "react-icons/hi";
const Dropdown = ({
                      currencies,curency,setCurency, favorite,handleFavorite,title=""
                  }) => {
  const isFavorite= curr=>favorite.includes(curr);
    // function isFavorite(curr){
    //     return favorite.includes(curr);
    // }

    return (
        <div className="">
            <label className="mt-2  text-gray-700 text-sm font-medium block" htmlFor={title}>{title}</label>
           <div className="mt-1 relative   ">
               <select value={curency} onChange={(e)=> setCurency(e.target.value)} className=" mr-2 p-2 w-full focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500  rounded-md shadow-sm border border-gray-300  ">
                   {favorite?.map(elem=><option className={"bg-gray-400 "}>{elem}</option>)}
                        <hr/>
                   {currencies?.filter(e=>!favorite.includes(e)).map((elem)=> <option value={elem} key={elem} > {elem}</option>)}


               </select>
               <button onClick={()=>handleFavorite(curency)} className="absolute inset-y-0 right-0 pr-5   text-sm leading-2 ">
                   {isFavorite(curency)?<HiStar className="text-yellow-500" />:<HiOutlineStar />}

               </button>
           </div>
        </div>
    );
};

export default Dropdown;