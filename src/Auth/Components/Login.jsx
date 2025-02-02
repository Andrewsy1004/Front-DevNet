
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import { IniciarSesion } from '../Helpers'

import useAuthStore from '../../Store/authStore';


export const Login = () => {
  const changeStatusPassword = useAuthStore.getState().changeValuePassword


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = formData

    if (!email.includes('@') || !email.includes('gmail.com') || !email.includes('.com')) {
      toast.error('El correo no es valido, debe ser un correo de gmail')
      return
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    const response = await IniciarSesion(email, password)
    const { ok, msg } = response

    if (ok) toast.success(msg)
    else toast.error(msg)

  }

  const StatusResetPassword = () => {
    changeStatusPassword( true )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
              Inicia sesión
            </h2>
          </div>


          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Contraseña */}
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
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="flex items-center justify-center">
              <div className="text-sm">
                <Link
                  to="/CuentaVerificacion"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  onClick={ StatusResetPassword }
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar sesión
              </button>
            </div>

          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  ¿No tienes una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="/register"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Registrarse
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}