import { useState } from "react";
import { Button } from "./Button";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export const TransferMoney = () => {

  const [ searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [amount, setAmount] = useState(0);
  const navigate = useNavigate()

  const handleTransfer = async (e) => {
    e.preventDefault();
  }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Send Money</h1>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="flex items-center mb-6">
          <div className="rounded-full h-12 w-12 bg-green-500 flex items-center justify-center mr-4">
            <span className="text-xl text-white font-semibold">{name[0].toUpperCase()}</span>
          </div>
          <div className="text-2xl font-semibold text-gray-800">{name}</div>
        </div>
        <form onSubmit={handleTransfer}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount (in Rs)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                ₹
              </span>
              <input 
                type="text" 
                id="amount"
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
                placeholder="Enter amount" 
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p id="amount-description" className="mt-1 text-sm text-gray-500">
              Enter the amount you wish to transfer.
            </p>
          </div>
          <Button onClick={async() => {
            await axios.post("http://localhost:3000/api/v1/account/transfer",{
              to: id,
              amount : parseFloat(amount)
            },{
              headers:{
                Authorization: "Bearer "+ localStorage.getItem("token")
              }
            })
            alert("Transfer successful")
            navigate("/dashboard")
          }} text="Initiate Transfer" disabled={!amount} />
          
        </form>
      
      </div>
    </div>
  );
};