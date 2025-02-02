
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Eye, EyeOff, Loader } from 'lucide-react'

import useAuthStore from '../../Store/authStore';
import { ChangePassword } from '../Helpers'


export const ResetPassword = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const VerifyToChangePassword = useAuthStore((state) => state.VerifyResetPassword);
  const email = useAuthStore((state) => state.email);


  useEffect(() => {
    if (!VerifyToChangePassword) {
      toast.error('Acceso no permitido')
      navigate('/')
    }
  }, [VerifyToChangePassword])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
  }
  
  if (!/[A-Z]/.test(password)) {
      toast.error('La contraseña debe contener al menos una letra mayúscula');
      return;
  }

  const response = await ChangePassword(email, password)

  const { ok, msg } = response

  if (ok) {
    toast.success(msg)
    navigate('/login')
  } else {
    toast.error(msg)
  }

  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
              Cambiar contraseña
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>


            <div>

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


            </div>

          </form>


        </div>
      </div>
    </div>
  )
}
