import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  //state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //context - get user from this
  //We dont need to show this page to logged in user
  const {
    state: { user },
  } = useContext(Context);

  //router
  const router = useRouter();

  //useEffect to redirect if user is already logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email for the secret code");
      setLoading(false);
      setEmail("");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    //console.log(email, code, newPassword);
    //return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
      toast("Great! Now you can login with your new password");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  return (
    <>
      <h1 className='jumbotron p-5 mb-4 rounded-3 text-center square'>
        Forgot Password
      </h1>

      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type='email'
            className='form-control mb-4 p-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
            required
          />

          {success && (
            <>
              <input
                type='text'
                className='form-control mb-4 p-4'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder='Enter secret code'
                required
              />

              <input
                type='password'
                className='form-control mb-4 p-4'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='New password'
                required
              />
            </>
          )}

          <button
            type='submit'
            className='btn btn-block btn-primary p-2'
            disabled={!email || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
