import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/account");
    } else {
      alert("Fill all fields");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 rounded-2xl">
        <CardContent className="space-y-6">

          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full" onClick={handleRegister}>
            Register
          </Button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-black font-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default Register;