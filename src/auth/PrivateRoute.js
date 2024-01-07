import React from "react";
import { Navigate } from "react-router";
import { useUser } from "./useUser";

export function PrivateRoute({children}){

    const user = useUser()

    return user ? children : <Navigate to="/login" />;

};
