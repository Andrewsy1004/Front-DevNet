

import { useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";

import { UpdatePostComment } from "../Helpers";

import useAuthStore from '../../Store/authStore';


export const Comments = ({ id, User, comentario, fecha, getCommetsByPost }) => {
  const [isEditing, setIsEditing] = useState(false); 
  const [newComentario, setNewComentario] = useState(comentario); 

  const IdUser = useAuthStore((state) => state.id);
  const Token = useAuthStore((state) => state.token);


  const handleUpdateClick = () => {
    setIsEditing(true); 
  };

  const handleSaveClick = async () => {
    
    const response = await UpdatePostComment(Token, id, newComentario);

    if (response.ok) {
      toast.success("Comentario actualizado con éxito");
      getCommetsByPost();
    }else {
      toast.error("Error al actualizar el comentario");
    }

    setIsEditing(false); // Salir del modo de edición
  };

  return (
    <>
      <li key={id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
        <div className="flex items-start justify-between">
          {/* Imagen del usuario */}
          <div className="flex items-center space-x-3">
            <img
              src={User?.urlPhoto}
              alt={User?.fullName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <Link
                to={`/PerfilUsuario/${User?.id}`}
                className="text-sm font-semibold text-gray-900 hover:underline"
              >
                {User?.fullName}
              </Link>
              <p className="text-xs text-gray-500">{fecha}</p>
            </div>
          </div>

         
          {
            User?.id === IdUser ? (
              <div className="flex items-center space-x-2">
                <button onClick={handleUpdateClick} className="text-gray-600 hover:text-gray-800">
                  <RefreshCcw size={16} />
                </button>
              </div>
            ) : null
          }


        </div>

        
        {!isEditing ? (
          <p className="mt-4 text-gray-700 text-sm">{comentario}</p>
        ) : (
          <div className="mt-4">
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newComentario}
              onChange={(e) => setNewComentario(e.target.value)} // Actualizar el estado
            />
            <div className="flex justify-end mt-2">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm"
                onClick={handleSaveClick} // Guardar cambios
              >
                Guardar
              </button>
            </div>
          </div>
        )}
      </li>
    </>
  );
};
