


import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const SendMyCV = async (token, postId) => {
    try {

        const response = await axios.post(`${API_BASE_URL}/post/EnviaarVacante`, { postId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return {
            ok: true,
            msg: "CV enviado exitosamente, espera la respuesta de la empresa !! "
        }

    } catch (error) {
       
        if( error.response.data.message === "You have already applied for this post" ){
            return {
                ok: false,
                msg: "Ya has aplicado a este post !! "
            }
        }

        return {
            ok: false,
            msg: "Hubo un error, por favor intenta de nuevo."
        }
    }
}


export const getCvFromJobs = async (token) => {
  try{

      const response = await axios.get(`${API_BASE_URL}/post/aplicantes/Jobs`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      
      return {
          ok: true,
          data: response.data
      }


  }catch(error){
    return {
        ok: false,
        msg: "Hubo un error, por favor intenta de nuevo."
    }
  }
}



export const MeasureOffert = async (token, isAceept, id) => {
    try{
        
        const response = await axios.post(`${API_BASE_URL}/post/CalificarVacante`, { isAceept, id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        return {
            ok: true,
            msg: "Medida de oferta enviada exitosamente !! "
        }

    }catch(error){
        return {
            ok: false,
            msg: "Hubo un error, por favor intenta de nuevo."
        }
    }

}