
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { X, RefreshCw } from "lucide-react";

import useAuthStore from "../../Store/authStore";
import { CreateCommet, getComments } from "../Helpers";
import { Comments } from "./Comments";

export const PostModal = ({ selectedPost, closeModal }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const Token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (selectedPost) {
            getCommetsByPost();
        }
    }, [selectedPost]);

    const submitCommet = async (e) => {
        e.preventDefault();

        if (!comment) {
            toast.error("El comentario no puede estar vacío");
            return;
        }

        if (comment.length < 5) {
            toast.error("El comentario debe tener al menos 5 caracteres");
            return;
        }

        const response = await CreateCommet(Token, comment, selectedPost.id);
        if (response.ok) {
            toast.success("Comentario agregado con éxito");
            setComment('');
            getCommetsByPost();
        } else {
            toast.error("Error al agregar comentario");
        }
    };

    const getCommetsByPost = async () => {
        const response = await getComments(selectedPost.id);
        if (response.ok) {
            setComments(response.comentarios || []);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-4xl flex flex-col md:flex-row">

                {/* Imagen y Usuario */}
                <div className="w-full md:w-1/2">
                    <div className="h-96 overflow-hidden rounded-lg ">
                        <img
                            src={selectedPost?.photo}
                            alt={selectedPost?.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="absolute flex items-center space-x-1">
                        <img
                            src={selectedPost.user?.urlPhoto}
                            alt={selectedPost.user?.fullName}
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <Link to={`/PerfilUsuario/${selectedPost.user?.id}`} className="text-black font-medium">
                            {selectedPost.user?.fullName}
                        </Link>
                    </div>
                </div>

                {/* Contenido */}
                <div className="w-full md:w-1/2 p-3 flex flex-col justify-between">
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                        onClick={closeModal}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div>
                        <h2 className="text-2xl font-bold mb-3">{selectedPost?.title}</h2>
                        <p className="text-gray-700 mb-4">{selectedPost?.content}</p>
                    </div>

                    {/* Comentarios */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-1">Comentarios:</h3>
                        <ul className="space-y-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2 border border-gray-200 rounded-lg">
                            {comments.length > 0 ? (
                                comments.map(({ id, comentario, fecha, User }) => (
                                    <Comments key={id} id={id} User={User} comentario={comentario} fecha={fecha} getCommetsByPost={getCommetsByPost} />
                                ))
                            ) : (
                                <li className="text-gray-500">No hay comentarios aún.</li>
                            )}
                        </ul>

                        {/* Formulario de Comentario */}
                        <form onSubmit={submitCommet} className="mt-4">
                            <label htmlFor="new-comment" className="block text-sm font-medium text-gray-700">
                                Agregar un comentario:
                            </label>
                            <textarea
                                id="new-comment"
                                rows="2"
                                placeholder="Escribe tu comentario aquí..."
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Enviar
                            </button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
