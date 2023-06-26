"use client";
import {signIn, useSession} from "next-auth/react";
import React, {useState} from "react";
import styles from "./page.module.css";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Loader from "@/components/Loading/Loader";

const Login = () => {
  const [error, setError] = useState(null);
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>Login</button>
        {error && "Something went wrong!"}
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
