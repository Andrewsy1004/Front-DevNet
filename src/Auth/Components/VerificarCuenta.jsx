

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Loader } from "lucide-react";

import { VerifyUser, RecoverPassword } from "../Helpers";

import useAuthStore from '../../Store/authStore';


export const VerificarCuenta = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    
    const changeStatusPassword = useAuthStore.getState().changeValuePassword
    const resetPassword = useAuthStore((state) => state.Recuperarpassword);
  
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const isValidEmail = (email) => {
            const gmailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
            return gmailPattern.test(email);
        };
    
        try {
            if (!isValidEmail(email)) {
                toast.error('Por favor ingresa un correo Gmail válido');
                return;
            }
    
            setIsLoading(true);
    
            // Usar un operador ternario hace el código más conciso
            const response = await (resetPassword 
                ? RecoverPassword(email) 
                : VerifyUser(email));
    
            if (response?.ok) {
                toast.success(response.msg);
                navigate('/verificarCorreo');
            } else {
                throw new Error(response?.msg || 'Error en la operación');
            }
    
        } catch (error) {
            toast.error(error.message || 'Ocurrió un error inesperado');
        } finally {
            setIsLoading(false);
        }
    };

    const StatusResetPassword = () => {
        changeStatusPassword( false )
      }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">

                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
                            Verificar cuenta
                        </h2>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <div className="mt-1">
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                    Verificando...
                                </div>
                            ) : (
                                'Enviar'
                            )}
                        </button>


                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    ¿Ya tienes una cuenta?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={StatusResetPassword}
                            >
                                Iniciar sesión
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
