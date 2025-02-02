
import { motion } from 'framer-motion';
import { informationFeatures, containerVariants, itemVariants } from '../data';


export const Features = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2 
                    className="text-3xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Todo lo que necesitas para crecer profesionalmente
                </motion.h2>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {informationFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-sm"
                                variants={itemVariants}
                                whileHover={{ 
                                    scale: 1.03,
                                    shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                                }}
                            >
                                <motion.div 
                                    className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
                                    initial={{ scale: 0, rotate: -880 }}
                                    animate={{ 
                                        scale: 1, 
                                        rotate: 0,
                                        transition: {
                                            type: "spring",
                                            stiffness: 200,
                                            delay: index * 0.2
                                        }
                                    }}
                                >
                                    <Icon className="text-blue-600" size={24} />
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}