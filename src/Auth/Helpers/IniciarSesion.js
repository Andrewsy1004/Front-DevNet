

import axios from "axios";

import useAuthStore from '../../Store/authStore';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const IniciarSesion = async (emailUser, password) => {
    const Login = useAuthStore.getState().Login

    try{
       
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: emailUser,
            password
        })

        const { data, status } = response

        const { email, fullName, roles, token, id, urlPhoto } = data

        Login(id, email, fullName, roles, token, urlPhoto)
        
         
        if( status === 201 ) {
            return {
                msg: "Inicio de sesión exitoso",
                ok: true
            }
        }
        
    }catch(error){        
        return {
            msg: "Contraseña o correo incorrecto",
            ok: false
        }
    }
}


export const registerUser = async (fullName, email, password) => {
    const registerFirstStep = useAuthStore.getState().firstVerify
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        fullName,
        email,
        password
      })
  
      const { data, status } = response
      registerFirstStep(email)
  
      return {
        msg: "Registro exitoso, se envió un correo para verificar tu cuenta, por favor revisa tu bandeja de entrada",
        ok: true
      }
      
    } catch (error) {
      if (error.isAxiosError && error.response) {
        if (error.response.status === 400 && 
            error.response.data.message.includes('Key (email)=')) {
          return {
            msg: "Este correo electrónico ya está registrado. Por favor, utiliza otro correo o recupera tu contraseña.",
            ok: false,
          }
        }
      }
  
      return {
        msg: "Hubo un error al intentar registrarte. Por favor, intenta de nuevo.",
        ok: false
      }

    }
  }


  export const VerifyUserWithCode = async (emailUser, code) => {
    const Login = useAuthStore.getState().Login

     try {
         const response = await axios.post(`${API_BASE_URL}/auth/VerifyEmail`, {
             email: emailUser,
             verificationCode: code
         })

         const { data } = response

         Login( data.user.id , data.user.email ,  data.user.fullName , data.user.roles  , data.token , data.user.urlPhoto )

        
         return {
             ok: true,
             msg: "Correo verificado exitosamente"
         }


     } catch (error) {
       console.log(error)
       return {
         ok: false,
         msg: "Hubo un error al intentar verificar tu correo. Por favor, intenta de nuevo."
       }
     }  
    
  }  


  export const VerifyUser = async (emailUser) => {
    const registerFirstStep = useAuthStore.getState().firstVerify

     try{
         
        const response = await axios.post(`${API_BASE_URL}/auth/GenerateCode`, {
            email: emailUser
        })

        registerFirstStep(emailUser)
        
        return {
            ok: true,
            msg: "Verifica tu bandeja de correo"
        }
        

     }catch(error){
      return {
        ok: false,
        msg: "Hubo un error, por favor intenta de nuevo."
      }
     }

  }

  export const RecoverPassword = async (emailUser) => {
    const registerFirstStep = useAuthStore.getState().firstVerify

    try {        
        const response = await axios.post(`${API_BASE_URL}/auth/forgotPassword`, {
            email: emailUser
        })
        
        registerFirstStep(emailUser)

         
        return {
            ok: true,
            msg: "Revisa tu bandeja de correo"
        }

    } catch (error) {
       return {
         ok: false,
         msg: "Hubo un error, por favor intenta de nuevo."
       }
    }

  }

  export const verifyCodeResetPassword = async (emailUser, code) => {
    const ChangeVisibilityResetPassword = useAuthStore.getState().changeVisibilityResetPassword

   try {
       
       const response = await axios.post(`${API_BASE_URL}/auth/verifyCodeResetPassword`, {
           email: emailUser,
           verificationCode: code
       })
       
       ChangeVisibilityResetPassword(true)

       return{
           ok: true,
           msg: "Verifica tu bandeja de correo"
       }
       
   } catch (error) {
     return{
       ok: false,
       msg: "Hubo un error, por favor intenta de nuevo."
     }
   }
  }


  export const ChangePassword = async (emailUser, password) => {
    const Logout = useAuthStore.getState().Logout

    try{
        
      const response = await axios.post(`${API_BASE_URL}/auth/changePassword`, {
          email: emailUser,
          password
      })

      Logout()

      return{
          ok: true,
          msg: "Contraseña cambiada exitosamente, por favor inicia sesión"
      }
       
    }catch(error){
      return{
        ok: false,
        msg: "Hubo un error, por favor intenta de nuevo."
      }
    }

  }