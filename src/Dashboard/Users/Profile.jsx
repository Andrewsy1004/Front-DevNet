
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { MessageCircle, UserPlus } from 'lucide-react';


import { getUsers } from "../Helpers";
import useAuthStore from '../../Store/authStore';

import { Loader } from "../../Components";

export const Profile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    const response = await getUsers(token);
    if (response.ok) {
      setUsers(response.users);
    }
    setLoading(false);
  };


  if (loading) {
    return (
      <Loader />
    );
  }


  return (
    <div className="max-w-2xl mx-auto p-4 overflow-y-auto ">
      <div className="mb-6 sticky top-0 bg-white p-4 shadow-md rounded-lg z-10">
        <h1 className="text-2xl font-bold text-gray-800">Usuarios</h1>
      </div>

      <div className="space-y-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.urlPhoto}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 hover:border-blue-400 transition-colors"
                />
                <div>
                  <Link to={`/PerfilUsuario/${user?.id}`} className="text-black font-medium">
                    {user?.fullName}
                  </Link>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 py-2">
              <p className="text-gray-700 leading-relaxed">
                {user.Descripcion.length > 200 ? (
                  <>
                    {user.Descripcion.slice(0, 200)}
                    <button className="text-blue-500 hover:text-blue-700 ml-1">
                      ...ver más
                    </button>
                  </>
                ) : (
                  user.Descripcion
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link
                     to={"/Chat"} 
                     className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">Enviar mensaje</span>
                  </Link>
                </div>

                <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors">
                  <UserPlus className="w-5 h-5" />
                  <span className="text-sm">Seguir</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};