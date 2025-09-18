import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Loader component (SpinKit)
const Loader = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="sk-chase">
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
    </div>
  </div>
);

// UserCard component
const UserCard = ({ user }) => {
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <img
          src={avatarUrl}
          className="card-img-top p-4"
          alt={user.username}
          style={{ height: '220px', objectFit: 'contain' }}
        />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
          <p className="card-text mb-1"><strong>Phone:</strong> {user.phone}</p>
          <p className="card-text mb-1"><strong>Website:</strong> {user.website}</p>
          <p className="card-text mb-1">
            <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}
          </p>
          <p className="card-text mb-0"><strong>Company:</strong> {user.company.name}</p>
        </div>
      </div>
    </div>
  );
};

// Main App component
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">User Profiles</h1>
      <div className="row">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;

