
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getInfoUser = async ( token ) => {
    try {
        
        const response = await axios.get(`${API_BASE_URL}/auth/getInfoUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const { data } = response
        
        return{
            ok: true,
            user: data.User
        }

        
    } catch (error) {
        return{
            ok: false,
            msg: "Hubo un error, por favor intenta de nuevo."
        } 
    }
}



export const UpdateInfoUser = async ( token, dataUser ) => {
    try {
        
        const response = await axios.patch(`${API_BASE_URL}/auth/updateInfoUser`, dataUser, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        return{
            ok: true,
            msg: "Información actualizada exitosamente"
        }
        
        
    } catch (error) {
        return{
            ok: false,
            msg: "Hubo un error, por favor intenta de nuevo."
        }
    }
}


export const getInfoUserByUUID = async ( uuid ) => {
    try {

        const response = await axios.get(`${API_BASE_URL}/auth/InfoUser/${uuid}`)

        const { data } = response
        
        return{
            ok: true,
            user: data
        }
        
    } catch (error) {
        return{
            ok: false,
            msg: "Hubo un error, por favor intenta de nuevo."
        }
    }
}


export const getUsers = async ( token ) => {
  try{
      
      const response = await axios.get(`${API_BASE_URL}/auth/AllUsers`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })

      const { data } = response
      
      return{
          ok: true,
          users: data
      }

  } catch (error) {
    return{
      ok: false,
      msg: "Hubo un error, por favor intenta de nuevo."
    } 
  }
}