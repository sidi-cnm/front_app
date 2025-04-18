"use client";

import Button from "@/component/Button";
import Form from "@/component/Form";
import Header from "@/component/Header";
import Input from "@/component/Input";
import ToggleSwitch from "@/component/ToggleSwitch";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-full z-0">
            <Header title="Welcome Back!" />
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="text-center text-gray-600 font-medium mb-3">Sign in with</div>
          <div className="flex justify-evenly items-center">
            <button className="border px-4 py-2 rounded"><i className="fab fa-facebook-f"></i></button>
            <button className="border px-4 py-2 rounded"><i className="fab fa-apple"></i></button>
            <button className="border px-4 py-2 rounded"><i className="fab fa-google"></i></button>
          </div>

          <div className="text-center text-gray-400 text-sm mb-2">or</div>
          <div className="text-center text-gray-400 text-xs mb-3 mt-1">Enter your email and password to signin</div>

          <Input
            label="Email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <ToggleSwitch
            id="remember-me"
            label="Remember me"
            checked={rememberMe}
            onChange={setRememberMe}
            />
          <Button text="SIGN IN" type="submit" />
        </Form>
    </div>
  );
}
