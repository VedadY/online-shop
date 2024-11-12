import React from 'react';

interface UserInfoModalProps {
  user: any;
  onClose: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">User Information</h2>
        <p><strong>Name:</strong> {user.name.firstname} {user.name.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserInfoModal;