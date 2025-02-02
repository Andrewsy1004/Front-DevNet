

import { Link } from 'react-router-dom';


export const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-2 py-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {/* <img src="/api/placeholder/40/40" alt="Logo" className="w-10 h-10" /> */}
                    <span className="text-2xl font-bold text-blue-600">DevNet</span>
                </div>
                <div className="flex gap-4 items-center">

                    
                    <Link to="/login" className="px-4 py-2 hover:text-blue-600">
                        Iniciar Sesión
                    </Link>

                    <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                        Registrarse
                    </Link>
                
                </div>
            </div>
        </nav>

    )
}
