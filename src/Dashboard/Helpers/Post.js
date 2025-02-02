

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const GetAllPosts = async (  ) => {
  try {
       
      const response = await axios.get(`${API_BASE_URL}/post/allPosts`)
      
      const { data } = response
    
      return{
        ok: true,
        posts: data
      }


  } catch (error) {
    return{
      ok: false,
      msg: "Hubo un error, por favor intenta de nuevo."
    } 
  }
}

export const UpdateInfoPost = async (token, idPost, data) => {
  try {
      const response = await axios.patch(`${API_BASE_URL}/post/${idPost}`, data, {
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

export const DeletePostByUuid = async(token, id) =>{
  try {
      
      const response = await axios.delete(`${API_BASE_URL}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

     return{
        ok: true,
        msg: "Post eliminado exitosamente"
      }

  } catch (error) {
    return{
      ok: false,
      msg: "Hubo un error, por favor intenta de nuevo."
    }
  }
}