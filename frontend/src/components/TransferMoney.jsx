import React, { useState } from "react";
import { Button } from "./Button";

export const TransferMoney = () => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle transfer logic here
    console.log("Initiating transfer of Rs.", amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Send Money</h1>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="flex items-center mb-6">
          <div className="rounded-full h-12 w-12 bg-green-500 flex items-center justify-center mr-4">
            <span className="text-xl text-white font-semibold">A</span>
          </div>
          <div className="text-2xl font-semibold text-gray-800">FirstName LastName</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount (in Rs)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                ₹
              </span>
              <input 
                id="amount"
                type="text" 
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount" 
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p id="amount-description" className="mt-1 text-sm text-gray-500">
              Enter the amount you wish to transfer.
            </p>
          </div>
          <Button type="submit" text="Initiate Transfer" disabled={!amount} />
        </form>
      </div>
    </div>
  );
};