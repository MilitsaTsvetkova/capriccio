import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import styles from "../utils.module.css";
import { useAuthSession } from "./AuthSessionContext";

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { session } = useAuthSession();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (session) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.centeredFlex}>
      <div>
        <h1>Capriccio</h1>
        <p>Sign in via magic link with your email below</p>

        {isLoading ? (
          <p>Sending magic link</p>
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
            <button>Send magic link</button>
          </form>
        )}
      </div>
    </div>
  );
};
