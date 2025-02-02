


export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10">
            <div className="max-w-6xl mx-auto ">
                <div className="grid grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-semibold mb-4">Producto</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Características</a></li>
                            <li><a href="#" className="hover:text-white">Precios</a></li>
                            <li><a href="#" className="hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Empresa</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Sobre nosotros</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Empleos</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Privacidad</a></li>
                            <li><a href="#" className="hover:text-white">Términos</a></li>
                            <li><a href="#" className="hover:text-white">Cookies</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Síguenos</h4>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white">Twitter</a>
                            <a href="#" className="hover:text-white">LinkedIn</a>
                            <a href="#" className="hover:text-white">Facebook</a>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-14 pt-8 text-center">
                    <p>&copy; 2025 DevNet. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
