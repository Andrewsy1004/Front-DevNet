
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Pencil } from 'lucide-react';


import useAuthStore from '../../Store/authStore';
import { getInfoUser, UpdateInfoUser, getInfoUserByUUID } from '../Helpers';
import { Loader } from '../../Components';

import { EditUserModal } from './EditUserModal';



export const User = ({ booleanParam = false }) => {
    const Token = useAuthStore((state) => state.token);
    const id = useAuthStore((state) => state.id);

    const updateProfileInfo = useAuthStore.getState().updateProfileUser

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { idUser } = useParams();
    const roles = userData ? userData.roles : [];


    useEffect(() => {
        fetchUserInfo();
    }, [Token, idUser, booleanParam]);

    const fetchUserInfo = async () => {
        try {

            let response;

            if (!booleanParam) {
                response = await getInfoUser(Token);
            } else {
                response = await getInfoUserByUUID(idUser);
            }

            if (response.ok) {
                setUserData(response.user);
            }
        } finally {
            setIsLoading(false);
        }
    };




    const handleSubmit = async (formData) => {
        // Aquí manejarías la lógica para actualizar los datos

        const response = await UpdateInfoUser(Token, formData);

        if (response.ok) {
            toast.success(response.msg);
            fetchUserInfo();

            updateProfileInfo(formData.fullName, roles, formData.urlPhoto);

        } else {
            toast.error(response.msg);
        }

        setIsModalOpen(false);
    };

    if (isLoading) return <Loader />;



    return (
        <>

            <EditUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userData={userData}
                onSubmit={handleSubmit}
            />

            <div className="h-full min-h-screen py-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto pb-8 ml-80">
                    {/* Tarjeta Principal */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative min-h-[500px]">
                        {userData && userData.id === id && (
                            <button
                                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full 
                    hover:bg-white transition-colors z-10 group shadow-lg cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Pencil
                                    className="h-5 w-5 text-gray-600 group-hover:text-blue-600"
                                    strokeWidth={2}
                                />
                            </button>
                        )}

                        <div className="h-48 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative">
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>

                        {/* Contenido Principal */}
                        <div className="relative -mt-24 pb-8">
                            {/* Foto de Perfil */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    {userData?.urlPhoto ? (
                                        <img
                                            src={userData.urlPhoto}
                                            alt={userData?.fullName || 'Profile'}
                                            className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl bg-gray-200" />
                                    )}
                                </div>
                            </div>

                            {/* Información del Usuario */}
                            <div className="text-center mt-6 px-6">
                                <h1 className="text-3xl font-bold text-gray-800 min-h-[36px]">
                                    {userData?.fullName || ' '}
                                </h1>
                                <p className="text-gray-600 mt-2 min-h-[24px]">
                                    {userData?.email || ' '}
                                </p>

                                {/* Rol Profesional */}
                                <div className="mt-4 min-h-[32px]">
                                    {userData?.Rol && (
                                        <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                                            {userData.Rol}
                                        </span>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div className="mt-6 max-w-2xl mx-auto">
                                    <p className="text-gray-600 leading-relaxed min-h-[100px]">
                                        {userData?.Descripcion || ' Coloca una descripción a tu perfil, con el fin de que otras personas sepan un poco sobre ti. '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};