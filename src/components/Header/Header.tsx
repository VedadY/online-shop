// Header.tsx
import React, { useState, useEffect } from 'react';
import UserInfoModal from '../Display-profile/UserInfoModal.tsx';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/users/1');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className='bg-zinc-800 text-center text-white py-2'>Site title</div>
      <header className="bg-stone-300 py-7 flex flex-wrap justify-between items-center">
        <div className="flex-1 text-left px-4 md:px-16 flex items-center">
          <img
            src="/images/images.png"
            alt="Logo"
            className="h-12 mr-1 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
          <span>Hi, {user?.username || ''}</span>
        </div>
        <div className="flex-1 text-center">
          <span className="text-lg font-bold">LOGO</span>
        </div>
        <div
          className="flex-1 text-right px-4 md:px-16 cursor-pointer"
          onClick={() => navigate('/cart')}
        >
          Cart <span className='bg-red-500 text-white px-2 rounded-full'>{cartCount}</span>
        </div>

        {isModalOpen && user && (
          <UserInfoModal user={user} onClose={() => setIsModalOpen(false)} />
        )}
      </header>
    </>
  );
};

export default Header;