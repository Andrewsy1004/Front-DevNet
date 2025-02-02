
import { Link, useLocation } from 'react-router-dom';
import { User, Briefcase, MessageCircle, FileText } from "lucide-react";

import useAuthStore from '../../Store/authStore';

export const DashboardLayout = ({ children }) => {
  const location = useLocation();
  
  const fullName = useAuthStore((state) => state.fullName);
  const roles    = useAuthStore((state) => state.roles);
  const Photo    = useAuthStore((state) => state.urlPhoto);
  const logout   = useAuthStore.getState().Logout;

  const name     = fullName.split(' ')[0];
  const lastName = fullName.split(' ')[2];

  return (
    <div className="h-screen w-full bg-white relative flex overflow-hidden">
      <aside className="h-full w-16 flex flex-col relative text-white" style={{ backgroundColor: '#2253d0' }}>
        <div className="flex-1 flex flex-col space-y-10 items-center justify-center">
          <Link 
            to="/Perfiles" 
            className={`h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white ${
              location.pathname === "/Perfiles" ? "bg-white text-gray-800" : ""
            }`}
          >
            <User className="w-6 h-6" />
          </Link>

          <Link 
            to="/" 
            className={`h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white ${
              location.pathname === "/" ? "bg-white text-gray-800" : ""
            }`}
          >
            <Briefcase className="w-6 h-6" />
          </Link>

          <Link 
            to="/Chat" 
            className={`h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white ${
              location.pathname === "/Chat" ? "bg-white text-gray-800" : ""
            }`}
          >
            <MessageCircle className="w-6 h-6" />
          </Link>

          <Link 
            to="/CvOfertas" 
            className={`h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white ${
              location.pathname === "/CvOfertas" ? "bg-white text-gray-800" : ""
            }`}
          >
            <FileText className="w-6 h-6" />
          </Link>
        </div>

        <button
          onClick={logout}
          className="mb-8 h-10 w-10 ml-3 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </aside>

      <div className="w-full h-full flex flex-col justify-between">
        <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 text-white" style={{ backgroundColor: '#2253d0' }}>
          <div className="flex flex-shrink-0 items-center space-x-4 text-white">
            <div className="flex flex-col items-end">
              <div className="text-md font-medium">{name} {lastName}</div>
              <div className="text-sm font-regular">
                {Array.isArray(roles) && roles.map((role, index) => (
                  <span key={index}>
                    {role}{index !== roles.length - 1 && ', '}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
              <Link to="/PerfilUsuario" className="block w-full h-full">
                <img
                  src={Photo ?? "https://thumbs.dreamstime.com/b/l%C3%ADnea-icono-del-negro-avatar-perfil-de-usuario-121102131.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-full h-full flex relative overflow-y-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
