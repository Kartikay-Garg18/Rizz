import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isMobile, showInMobile }) => {
  const location = useLocation();
  const cl = "my-3 w-10 cursor-pointer hover:opacity-80 transition-all hover:scale-110";
  
  const navItems = [
    {
      to: "/chat",
      icon: "https://img.icons8.com/?size=100&id=118377&format=png&color=FFFFFF",
      alt: "Messages",
      isActive: location.pathname === "/chat"
    },
    {
      to: "/chat/calling",
      icon: "https://img.icons8.com/?size=100&id=vfXAPwB00Ntn&format=png&color=FFFFFF",
      alt: "Calls",
      isActive: location.pathname === "/chat/calling"
    },
    {
      to: "/chat/setting",
      icon: "https://img.icons8.com/?size=100&id=364&format=png&color=FFFFFF",
      alt: "Settings",
      isActive: location.pathname === "/chat/setting"
    }
  ];
  
  return (
    <div className={`
      bg-gradient-to-b from-purple-900/80 to-indigo-900/80 backdrop-blur-lg shadow-lg border-t border-purple-500/30
      ${isMobile 
        ? `fixed bottom-0 left-0 right-0 px-4 py-4 flex flex-row justify-around items-center z-30 
           ${!showInMobile ? 'hidden' : ''}` 
        : 'px-4 py-6 w-16 flex flex-col justify-start items-center h-full'
      }
    `}>
      {navItems.map((item) => (
        <Link 
          key={item.alt} 
          to={item.to}
          className={`relative ${isMobile ? 'mx-4' : 'my-6'}`}
        >
          <img 
            src={item.icon} 
            alt={item.alt} 
            className={`${cl} ${item.isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`} 
          />
          {item.isActive && (
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
          )}
        </Link>
      ))}
    </div>
  )
}

export default Sidebar