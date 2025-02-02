
import { useState } from "react";
import toast from "react-hot-toast";
import { X, Upload } from "lucide-react";

import { fileUpload } from "../../Helpers";
import { UpdateInfoPost } from "../Helpers";

import useAuthStore from '../../Store/authStore';


export const EditModalPost = ({ isOpen, onClose, post, handlePostUpdated }) => {
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: post?.title || '',
        content: post?.content || '',
        photo: post?.photo || '',
        endedAt: post?.endedAt || ''
    });
    
    const token  = useAuthStore((state) => state.token);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        
        if (!file) return;

        try {
            setLoading(true);
            const imageUrl = await fileUpload(file);
            setFormData({
                ...formData,
                photo: imageUrl
            });
            toast.success('Imagen cargada exitosamente');
        } catch (error) {
            toast.error('Error al cargar la imagen');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const formattedData = {
            ...formData,
            endedAt: formData.endedAt ? new Date(formData.endedAt).toISOString() : undefined
        };
        
        const response = await UpdateInfoPost( token, post.id, formattedData );
         
        if (response.ok) {
            toast.success(response.msg);
            handlePostUpdated();
        } else {
            toast.error(response.msg);
        }

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-xl w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold mb-6">Editar Publicación</h2>

                <form onSubmit={handleSubmit}>
                    {/* Título */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                            Título
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Contenido */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="content" >
                            Contenido
                        </label>
                        <textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Imagen */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Imagen
                        </label>
                        <div className="space-y-4">
                            {formData.photo && (
                                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                                    <img 
                                        src={formData.photo} 
                                        alt="Vista previa" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            
                            {/* Input de archivo */}
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                    id="image-upload"
                                    disabled={loading}
                                />
                                <label
                                    htmlFor="image-upload"
                                    className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <Upload className="w-5 h-5 mr-2" />
                                    {loading ? 'Cargando...' : 'Subir nueva imagen'}
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Fechas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Fecha de finalización */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="endedAt" >
                                Fecha de finalización
                            </label>
                            <input
                                id="endedAt"
                                type="datetime-local"
                                value={formData.endedAt}
                                onChange={(e) => setFormData({ ...formData, endedAt: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min={ new Date().toISOString().slice(0, 16) }
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};