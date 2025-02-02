

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const CreateCommet = async (token, comentario, idPost) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/post/comentario/${idPost}`, {comentario}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        
        return {
            ok: true,
            msg: "Comentario creado exitosamente"
        }

    } catch (error) {
        return {
            ok: false,
            msg: "Hubo un error, por favor intenta de nuevo."
        }
    }
}

export const getComments = async (idPost) => {
    try {
        
        const response = await axios.get(`${API_BASE_URL}/post/getComentarios/${idPost}`);

        const { data } = response;
        
        return {
            ok: true,
            comentarios: data
        }

    } catch (error) {
        return {
            ok: false,
            msg: "Hubo un error, por favor intenta de nuevo."
        }
    }
}


export const UpdatePostComment = async (token, idComentario, comentario) => {
    try {

        const response = await axios.patch(`${API_BASE_URL}/post/comentario/${idComentario}`, {comentario}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return {
            ok: true,
            msg: "Comentario actualizado exitosamente"
        }
        
    } catch (error) {
      return {
        ok: false,
        msg: "Hubo un error, por favor intenta de nuevo."
      }   
    }
}