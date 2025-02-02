

import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

import { ArrowRight } from 'lucide-react';
import heroImage from '../../assets/HeroNet.png'


export const Hero = () => {
    
    const navigate = useNavigate();

    return (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <div className="max-w-6xl mx-auto px-4 flex items-center">
                <div className="w-1/2 pr-8">
                    <h1 className="text-5xl font-bold mb-6">
                        Tu red profesional empieza aquí
                    </h1>
                    <p className="text-xl mb-8">
                        Conecta con profesionales, encuentra oportunidades y haz crecer tu carrera de forma&nbsp;
                        <span>
                            <Typewriter
                                words={['Rapida', 'Gratuita', 'Facil']}
                                loop={true}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </span>
                    </p>

                    <button
                        onClick={() => navigate('/register')} 
                        type="button" 
                        className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 flex items-center gap-2">
                        Comienza ahora
                        <ArrowRight size={20} />
                    </button>

                </div>

                <div className="w-1/2">
                    <img src={heroImage} alt="Hero" className="rounded-lg shadow-xl" />
                </div>

            </div>
        </section>
    )
}


