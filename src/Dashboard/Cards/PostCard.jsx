
import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Edit, Trash2, SendHorizonal } from "lucide-react";
import toast from "react-hot-toast";

import useAuthStore from '../../Store/authStore';
import { EditModalPost } from "../Components";
import { DeletePostByUuid, SendMyCV } from "../Helpers";

export const PostCard = ({ post, openModal, handlePostUpdated }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const idUser = useAuthStore((state) => state.id);
  const token = useAuthStore((state) => state.token);

  const handleEdit = (post) => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async (postId) => {
    const response = await DeletePostByUuid(token, postId);

    if (response.ok) {
      toast.success(response.msg);
      handlePostUpdated();
    } else {
      toast.error(response.msg);
    }
  };
  
  const HandleSendCv = async (postId) => {
    
    const response = await SendMyCV(token, postId);

    if (response.ok) {
      toast.success(response.msg);
    } else {
      toast.error(response.msg);
    }

  }

  return (
    <>
      <div
        key={post.id}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        {/* Imagen */}
        <div
          className="relative h-52 overflow-hidden cursor-pointer"
          onClick={() => openModal(post)}
        >
          <img
            src={post.photo}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Usuario */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-3">
            <img
              src={post.user?.urlPhoto}
              alt={post.user?.fullName}
              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            />
            <Link to={`/PerfilUsuario/${post.user?.id}`} className="text-white font-medium">
              {post.user?.fullName}
            </Link>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
              {post.title}
            </h2>

            {/* Movimos los botones de edición aquí */}
            {post.user?.id === idUser && (
              <div className="flex space-x-3 ml-4">
                <button
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  onClick={() => handleEdit(post)}
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>

          {/* Metadatos con Botones de Acción */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <CalendarDays className="h-4 w-4 text-gray-500" />
              <span>{post.publishedAt}</span>
            </div>

            {
              post.user?.id !== idUser && (
                <div className="flex items-center space-x-4">
                  <button
                     onClick={() => HandleSendCv(post.id)} 
                     className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    <SendHorizonal className="h-4 w-4 mr-1" />
                    Aplicar Vacante
                  </button>
                </div>
              )
            }


          </div>
        </div>

        {/* Estado */}
        {post.isActive && (
          <div className="px-6 py-4 bg-green-50 border-t">
            <span className="text-green-600 text-sm font-medium flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Vacante Activa — ¡Aplica Ahora!
            </span>
          </div>
        )}
      </div>


      <EditModalPost
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={post}
        handlePostUpdated={handlePostUpdated}
      />


    </>
  );
};