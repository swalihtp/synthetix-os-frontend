import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { verifyMFA } from "../../api/auth"

function VerifyMFA(){

  const [otp,setOtp] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()

    const user_id = localStorage.getItem("mfa_user")

    const res = await verifyMFA({
      user_id: user_id,
      otp
    })

    localStorage.setItem("token",res.token)

    navigate("/")
  }

  return(

    <form onSubmit={handleSubmit}>

      <h2>Enter MFA Code</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        onChange={(e)=>setOtp(e.target.value)}
      />

      <button type="submit">
        Verify
      </button>

    </form>

  )
}

export default VerifyMFA