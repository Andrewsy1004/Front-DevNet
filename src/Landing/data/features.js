

import { Users, Briefcase, Globe } from 'lucide-react';


export const informationFeatures = [
    {
        title: 'Conexiones Profesionales',
        description: 'Construye tu red profesional y conecta con expertos en tu industria.',
        icon: Users,
    },
    {
        title: 'Oportunidades Laborales',
        description: 'Encuentra oportunidades de trabajo en empresas reconocidas.',
        icon: Briefcase,
    },
    {
        title: 'Alcance Global',
        description: 'Explora oportunidades de trabajo en diferentes ubicaciones y culturas.',
        icon: Globe,    
    }
];

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export const itemVariants = {
    hidden: { 
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};