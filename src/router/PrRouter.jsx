

import { Routes, Route } from "react-router-dom"
import { LandingPage } from "../Landing"
import { Login, Register, SecondVerify, VerificarCuenta, ResetPassword } from "../Auth"


export const PrRouter = () => {

    return (
        <Routes>
            <Route>
                <Route path="/" element={<LandingPage /> } />
                
                <Route path="/login" element={<Login /> } />
                <Route path="/register" element={<Register /> } />
                
                <Route path="/verificarCorreo" element={ <SecondVerify /> } />
                <Route path="/CuentaVerificacion" element={ <VerificarCuenta /> } />
                <Route path="/reset-password" element={ <ResetPassword /> } />

                <Route path="/*" element={ <LandingPage /> } />

            </Route>
        </Routes>
    )
}