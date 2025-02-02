
import { motion, useSpring, useScroll } from "framer-motion"

export const ScrollLinked = ({ children }) => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })
    
    return (
        <>
            <motion.div
                style={{
                    scaleX,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "10px",
                    transformOrigin: "0%",
                    backgroundColor: "#1957ff",
                    zIndex: 50
                }}
            />
            {children}
        </>
    )
}