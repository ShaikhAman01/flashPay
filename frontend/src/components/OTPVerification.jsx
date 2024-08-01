import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const OTPVerification = ({ userId }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/verifyOTP', {
        userId,
        otp,
      });
      console.log("UserID : " + userId + "OTP : " + otp)

      if (response.data.status === 'VERIFIED') {
        setMessage('Your email has been verified successfully.');
        navigate('/dashboard')
      } 
      else {
        setMessage('Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('An error occurred while verifying OTP.');
    }
  };

  return (
    <div>
      <h2>Verify Your OTP</h2>
      <form onSubmit={handleSubmit}>
        <label>
          OTP:
          <input
            type="text"
            value={otp}
            onChange={handleOTPChange}
            required
          />
        </label>
        <button type="submit">Verify OTP</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default OTPVerification;
