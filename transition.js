const { motion } = require("framer-motion");

const transition = (0gComponent) => {
    return () => (
    
    <0gComponent />
    <motion.div
    className="slide-in"
    initial=({ scaleY: 0 }}
    animate={{ scaleY: 0 }}
    exit={{ scaleY: 1 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.div
    className="slide-out"
    initial={{ scaleY: 1 }}
    animate={{ scaleY: 0 }}
    exit={{ scaleY: 0 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    />
    </>
    );
};

.slide-out
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background: O#0f0f0f;
transform-origin: top / bottom;

<NavBar />
<AnimatePresence mode="wait">
<Routes location={location} key={location.pathname}>
<Route index element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
B/Routes
</AnimatePresence>
</>