import { FaChartBar, FaFileAlt, FaCog, FaFileUpload, FaRegFileAlt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import logo from '../static/harding-loevner-logo.png';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: <FaChartBar />, path: '/dashboard' },
    { label: 'Portfolio Analysis', icon: <span className="text-lg">📊</span>, path: '/portfolio-analysis' },
    { label: 'Documents', icon: <FaFileAlt />, path: '/documents' },
    { label: 'Proposals', icon: <FaFileUpload />, path: '/proposals' },
    { label: 'Reports', icon: <FaRegFileAlt />, path: '/reports' },
    { label: 'Settings', icon: <FaCog />, path: '/settings' }
  ];

  return (
    <div className="w-56 bg-white shadow-md min-h-screen px-4 py-6">
      <div className="flex items-center mb-10 space-x-2">
        <img src={logo} alt="HL Compare" className="h-10" />
        {/* <span className="text-xl font-bold">HL Compare</span> */}
      </div>
      <nav className="space-y-2 text-sm">
        {menuItems.map(({ label, icon, path }) => (
          <Link
            to={path}
            key={label}
            className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 font-medium ${
              location.pathname === path ? 'bg-blue-100 text-blue-800' : 'text-gray-900'
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
