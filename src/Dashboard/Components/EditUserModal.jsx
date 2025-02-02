
import { useState } from 'react';
import toast from 'react-hot-toast';

import { X, Upload } from 'lucide-react';
import { fileUpload } from '../../Helpers';

export const EditUserModal = ({ isOpen, onClose, userData, onSubmit }) => {

  const [imageUrl, setImageUrl] = useState(userData?.urlPhoto || '');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await fileUpload(file);
      setImageUrl(url);
    } catch (error) {
      console.error('Error al subir imagen:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName: e.target.fullName.value,
      Rol: e.target.Rol.value,
      urlPhoto: imageUrl,
      Descripcion: e.target.Descripcion.value,
    };

    if (!formData.fullName || !formData.Rol || !formData.Descripcion || !formData.urlPhoto) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50  backdrop-blur-sm">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Editar Perfil</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              defaultValue={userData?.fullName}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="Rol" className="block text-sm font-medium text-gray-700 mb-1">
              Rol Profesional
            </label>
            <input
              id="Rol"
              name="Rol"
              type="text"
              defaultValue={userData?.Rol}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto de Perfil
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="relative">
                <img
                  src={imageUrl || userData?.urlPhoto}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              <label className="cursor-pointer px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Subir imagen</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="Descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="Descripcion"
              name="Descripcion"
              defaultValue={userData?.Descripcion}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={isUploading}
            >
              {isUploading ? 'Subiendo...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};