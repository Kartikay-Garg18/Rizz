import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Footer() {
    const socialLinks = [
        {
            name: 'Instagram',
            url: 'https://instagram.com/rizz',
            icon: 'https://img.icons8.com/?size=100&id=32292&format=png&color=FFFFFF',
            gradient: 'from-pink-500 via-purple-500 to-red-500'
        },
        {
            name: 'Facebook',
            url: 'https://facebook.com/rizz',
            icon: 'https://img.icons8.com/?size=100&id=87264&format=png&color=FFFFFF',
            gradient: 'from-blue-600 via-blue-500 to-blue-700'
        },
        {
            name: 'YouTube',
            url: 'https://youtube.com/rizz',
            icon: 'https://img.icons8.com/?size=100&id=NgVx6SS0Wbjb&format=png&color=FFFFFF',
            gradient: 'from-red-500 via-red-600 to-red-700'
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com/rizz',
            icon: 'https://img.icons8.com/?size=100&id=A4DsujzAX4rw&format=png&color=FFFFFF',
            gradient: 'from-blue-400 via-blue-500 to-blue-600'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const socialVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
        },
        hover: {
            scale: 1.1,
            y: -5,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="relative w-full overflow-hidden bg-gradient-to-t from-slate-900 via-purple-900 to-transparent border-t border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="text-center lg:text-left"
                    >
                        <motion.h2
                            className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4"
                        >
                            RIZZ
                        </motion.h2>
                        <p className="text-gray-300 text-lg max-w-md mx-auto lg:mx-0">
                            Experience the future of communication with lightning-fast, secure, and intuitive messaging.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center"
                    >
                        <div className="flex space-x-6">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={socialVariants}
                                    whileHover="hover"
                                    className="relative group"
                                >
                                    <div className="relative">
                                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}></div>
                                        <div className="relative w-14 h-14 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20">
                                            <img
                                                src={social.icon}
                                                alt={`${social.name} icon`}
                                                className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                        {social.name}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        className="text-center lg:text-right"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <Link
                                to="/signup"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-4"
                            >
                                Join RIZZ Today
                            </Link>
                        </motion.div>
                        <p className="text-gray-400 text-sm">Start your journey with us</p>
                    </motion.div>
                </motion.div>
                <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
                >
                    <div className="flex flex-wrap justify-center md:justify-start space-x-8">
                        {['About', 'Privacy', 'Terms', 'Help', 'Contact'].map((link) => (
                            <motion.a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link}
                            </motion.a>
                        ))}
                    </div>
                    <motion.div
                        className="text-center md:text-right"
                        whileHover={{ scale: 1.02 }}
                    >
                        <p className="text-gray-400 text-sm">
                            © 2025 Copyright:{' '}
                            <motion.a
                                href="https://RIZZ.com/"
                                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 transition-all duration-300 font-medium"
                                whileHover={{ scale: 1.05 }}
                            >
                                RIZZ.com
                            </motion.a>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
        </motion.footer>
    );
}

export default Footer;