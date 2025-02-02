
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import useAuthStore from '../../Store/authStore'
import { VerifyUserWithCode, verifyCodeResetPassword } from '../Helpers'

import { Loader, Clock } from 'lucide-react'

export const SecondVerify = () => {
  const navigate = useNavigate()
  const email = useAuthStore((state) => state.email)
  const resetPassword = useAuthStore((state) => state.Recuperarpassword);


  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    if (!email) {
      toast.error('Acceso no permitido')
      navigate('/')
    }
  }, [email, navigate])

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSubmit = async (e) => {
    e.preventDefault()


    if (code.length < 5) {
      toast.error('El código debe tener 5 dígitos o mas')
      return
    }

    setIsLoading(true)

    const response = await (resetPassword ? verifyCodeResetPassword(email, code)
      : VerifyUserWithCode(email, code))

    const { ok, msg } = response




    if (ok) {
      toast.success(msg)

      if (resetPassword) {
        console.log('resetPassword')
        navigate('/reset-password')
        return
      }

      navigate('/')
    } else {
      toast.error(msg)
    }

    setIsLoading(false)
  }

  if (!email) return null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Verificar correo electrónico
            </h2>

            <p className="mt-2 text-center text-sm text-gray-600">
              Hemos enviado un código de verificación a{' '}
              <span className="font-medium text-[#2253d0]">{email}</span>
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">
                Tiempo restante: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>

          </div>

          <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Código de verificación
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2253d0] focus:border-[#2253d0] sm:text-sm"
                  placeholder="Ingresa el código de 6 dígitos"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${isLoading ? 'bg-[#2253d0]/70 cursor-not-allowed' : 'bg-[#2253d0] hover:bg-[#2253d0]/90'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2253d0]`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Verificando...
                  </div>
                ) : (
                  'Verificar código'
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm font-medium text-[#2253d0] hover:text-[#2253d0]/80"
                onClick={() => {/* Lógica para reenviar código */ }}
              >
                Reenviar código
              </button>
              <button
                type="button"
                className="text-sm font-medium text-gray-600 hover:text-gray-500"
                onClick={() => navigate('/')}
              >
                Volver al inicio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}