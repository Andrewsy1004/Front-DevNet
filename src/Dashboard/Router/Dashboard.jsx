

import { Applicantes, DashboardLayout, Post } from "../Components"
import { Chat } from "../../Chat"

import { Routes, Route } from "react-router-dom"

import { User } from "../Components"
import { Profile } from "../Users/Profile"

export const Dashboard = () => {
    return (
        <DashboardLayout>
            <Routes>
                 
                <Route path="/PerfilUsuario" element={ <User/> } />

                <Route path="/PerfilUsuario/:idUser" element={ <User booleanParam={true} /> } />
                
                <Route path="/Perfiles" element={ <Profile /> } />

                <Route path="/Chat" element={ <Chat /> } />

                <Route path="/CvOfertas" element={ <Applicantes /> } />

                <Route path="/*" element={ <Post /> } />

            </Routes>
        </DashboardLayout>
    )
}
