import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const headerVariants = {
        top: {
            backgroundColor: "rgba(15, 23, 42, 0.0)",
            backdropFilter: "blur(0px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.0)",
        },
        scrolled: {
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }
    };

    const navigationItems = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Help", href: "#help" },
        { label: "Contact", href: "#contact" }
    ];

    return (
        <motion.header
            variants={headerVariants}
            animate={isScrolled ? "scrolled" : "top"}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm bg-slate-900/70 border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-4">
                        
                        <h1 className="text-2xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                            RIZZ
                        </h1>
                    </div>
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navigationItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="relative px-6 py-3 text-lg font-medium text-gray-300 transition-all duration-300 group"
                            >
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm border border-white/10"></div>
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                    {item.label}
                                </span>
                                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="hidden sm:inline-flex">
                            <button
                                className="relative px-6 py-3 text-lg font-semibold text-white overflow-hidden group rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                            >
                                <span className="relative z-10">Get Started</span>
                                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </Link>
                        <button
                            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <div className="w-6 h-6 flex flex-col justify-center items-center">
                                <span className={`w-6 h-0.5 bg-current mb-1 transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                                <span className={`w-6 h-0.5 bg-current mb-1 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
                                <span className={`w-6 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                            </div>
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="lg:hidden overflow-hidden">
                        <div className="px-4 py-6 space-y-4 backdrop-blur-sm bg-white/5 rounded-2xl mt-4 border border-white/10">
                            {navigationItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white transition-colors duration-300 rounded-xl hover:bg-white/10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-white/10">
                                <Link
                                    to="/login"
                                    className="block w-full"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <button
                                        className="w-full px-6 py-3 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                                    >
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.header>
    );
}

export default Header;