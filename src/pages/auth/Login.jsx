import React from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Link } from "react-router-dom";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Login to Your Account
        </h2>

        <div className="flex flex-col gap-6">
          <FloatLabel>
            <InputText id="email" className="w-full" placeholder="exam@gamil.com" />
            <label htmlFor="email">Email</label>
             
          </FloatLabel>

          <FloatLabel>
            <Password
              id="password"
              toggleMask
              feedback={false}
              className="w-full"
              placeholder="********"
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>

          <Button
            label="Login"
            className="w-full mt-2 bg-blue-500 border-none hover:bg-blue-600"
          />

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/res"
              className="text-blue-500 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
