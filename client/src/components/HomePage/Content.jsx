import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Content() {
    
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <main className="pt-24 lg:pb-16 bg-transparent">
            
            <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative flex items-center justify-center"
                id="home"
            >
                
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                </div>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 px-4 sm:px-6 lg:px-8">
                    
                    <motion.div variants={itemVariants} className="text-center lg:text-left">
                        <motion.h1
                            className="text-5xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6"
                        >
                            Welcome To
                            <span className="block text-4xl lg:text-8xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                RIZZ
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-300 mb-8 max-w-2xl"
                        >
                            Experience the future of communication with lightning-fast, secure, and intuitive messaging
                        </motion.p>
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <Link
                                to="/login"
                                className="cursor-pointer inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Get Started
                            </Link>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="relative hidden lg:block">
                        <div className="relative backdrop-blur-sm bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
                            <img
                                src="https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_800/v1752847887/home_hxsf2m"
                                alt="RIZZ Communication"
                                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                                loading="lazy"
                                srcSet="
                                    https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_400/v1752847887/home_hxsf2m 400w,
                                    https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_800/v1752847887/home_hxsf2m 800w,
                                    https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_1200/v1752847887/home_hxsf2m 1200w
                                "
                                sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-2xl"></div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <div className="my-12 h-1 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent max-w-7xl mx-auto"></div>

            <motion.section
                id="about"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="py-12 px-0 relative"
            >
                <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        variants={itemVariants}
                        className="text-5xl lg:text-6xl font-bold text-white mb-8"
                    >
                        Why Choose{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            RIZZ
                        </span>
                        ?
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="max-w-4xl mx-auto backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10"
                    >
                        <p className="text-xl text-gray-300 leading-relaxed">
                            RIZZ stands out as a top choice for real-time communication with its fast, lag-free messaging system.
                            The app ensures instant delivery of messages, making conversations feel natural and seamless.
                            It offers a customizable interface with various themes to match your personal style.
                            With secure user authentication and data encryption, your conversations are always private and protected.
                            Whether for personal chats or group discussions, RIZZ delivers a smooth and engaging experience for every user.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            <div className="my-12 h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent max-w-7xl mx-auto"></div>

            <motion.section
                id="features"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="py-12 px-0"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        variants={itemVariants}
                        className="text-5xl lg:text-6xl font-bold text-center text-white mb-16"
                    >
                        Functionality Of{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            RIZZ
                        </span>
                    </motion.h2>

                    <div className="grid gap-16">
                        <motion.div
                            variants={itemVariants}
                            className="grid lg:grid-cols-2 gap-8 items-stretch"
                        >
                            <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Real Time Chatting
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Experience lightning-fast messaging that delivers your thoughts instantly.
                                    Our real-time infrastructure ensures zero lag, making conversations feel as natural as face-to-face interactions.
                                </p>
                            </div>
                            <div className="relative hidden lg:block">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30"></div>
                                <div className="relative h-full min-h-[300px] rounded-3xl overflow-hidden">
                                    <img
                                        src="https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_600/v1752847888/Instant_gny5sh"
                                        alt="Real time application"
                                        className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                                        loading="lazy"
                                        srcSet="
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_300/v1752847888/Instant_gny5sh 300w,
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_600/v1752847888/Instant_gny5sh 600w,
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_900/v1752847888/Instant_gny5sh 900w
                                        "
                                        sizes="(max-width: 768px) 300px, (max-width: 1200px) 600px, 900px"
                                    />
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="grid lg:grid-cols-2 gap-8 items-stretch"
                        >
                            <div className="relative lg:order-1 hidden lg:block">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-30"></div>
                                <div className="relative h-full min-h-[300px] rounded-3xl overflow-hidden">
                                    <img
                                        src="https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_600/v1752847888/Themes_abiok3"
                                        alt="Theme customization"
                                        className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                                        loading="lazy"
                                        srcSet="
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_300/v1752847888/Themes_abiok3 300w,
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_600/v1752847888/Themes_abiok3 600w,
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_900/v1752847888/Themes_abiok3 900w
                                        "
                                        sizes="(max-width: 768px) 300px, (max-width: 1200px) 600px, 900px"
                                    />
                                </div>
                            </div>
                            <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 lg:order-2 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Personalized Themes
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Make RIZZ truly yours with our extensive theme collection. From minimalist dark modes to vibrant colorful designs,
                                    personalize your chat experience to match your mood and style.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="grid lg:grid-cols-2 gap-8 items-stretch"
                        >
                            <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                                    Advanced Security
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Your privacy is our priority. With end-to-end encryption, secure authentication, and advanced security protocols,
                                    your conversations remain private and protected from unauthorized access.
                                </p>
                            </div>
                            <div className="relative hidden lg:block">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-cyan-600 rounded-3xl blur opacity-30"></div>
                                <div className="relative h-full min-h-[300px] rounded-3xl overflow-hidden">
                                    <img
                                        src="https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_600/v1752847887/Security_f0klbr"
                                        alt="Security features"
                                        className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                                        loading="lazy"
                                        srcSet="
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_300/v1752847887/Security_f0klbr 300w,
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_600/v1752847887/Security_f0klbr 600w,
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_900/v1752847887/Security_f0klbr 900w
                                        "
                                        sizes="(max-width: 768px) 300px, (max-width: 1200px) 600px, 900px"
                                    />
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="grid lg:grid-cols-2 gap-8 items-stretch"
                        >
                            <div className="relative lg:order-1 hidden lg:block">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl blur opacity-30"></div>
                                <div className="relative h-full min-h-[300px] rounded-3xl overflow-hidden">
                                    <img
                                        src="https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_600/v1752847886/Lag_wuvq7z"
                                        alt="Performance optimization"
                                        className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                                        loading="lazy"
                                        srcSet="
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_300/v1752847886/Lag_wuvq7z 300w,
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_600/v1752847886/Lag_wuvq7z 600w,
                                            https://res.cloudinary.com/dtkqxxlmk/image/upload/f_auto,q_auto,w_900/v1752847886/Lag_wuvq7z 900w
                                        "
                                        sizes="(max-width: 768px) 300px, (max-width: 1200px) 600px, 900px"
                                    />
                                </div>
                            </div>
                            <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 lg:order-2 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                    Lag-Free Performance
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Built with cutting-edge technology for optimal performance. Experience smooth, responsive interactions
                                    even during peak usage times, ensuring your conversations never miss a beat.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <div className="my-12 h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 max-w-7xl mx-auto"></div>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="py-12 px-0 text-center"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl lg:text-5xl font-bold text-white mb-8"
                    >
                        Ready to Experience the Future of Communication?
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-7 justify-center items-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <Link
                                to="/signup"
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Join RIZZ Today
                            </Link>
                        </motion.div>
                        <motion.a
                            href="#about"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
                        >
                            Learn More
                        </motion.a>
                    </motion.div>
                </div>
            </motion.section>
        </main>
    );
}

export default Content;