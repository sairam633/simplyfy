import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, Form, Input, Spin } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './App.css';

// UserCard component
const UserCard = ({ user, onEdit }) => {
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;

  return (
    <Card
      hoverable
      cover={
        <img
          alt={user.username}
          src={avatarUrl}
          style={{ height: '220px', objectFit: 'contain', padding: '20px' }}
        />
      }
      actions={[
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(user)}
        >
          Edit
        </Button>,
      ]}
    >
      <Card.Meta title={user.name} />
      <p className="mt-2"><MailOutlined /> {user.email}</p>
      <p><PhoneOutlined /> {user.phone}</p>
      <p><GlobalOutlined /> {user.website}</p>
      <p><HomeOutlined /> {user.address.street}, {user.address.city}</p>
      <p><TeamOutlined /> {user.company.name}</p>
    </Card>
  );
};

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  // Handle edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Save edited data
  const handleFormSubmit = (values) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id ? { ...u, ...values } : u
      )
    );
    setIsModalOpen(false);
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Spin size="large" tip="Loading users..." />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">User Profiles</h1>
      <Row gutter={[24, 24]} justify="center">
  {users.map((user) => (
    <Col
      key={user.id}
      xs={24}   // 1 card per row on extra small (mobile)
      sm={12}   // 2 cards per row on small screens (tablet portrait)
      md={8}    // 3 cards per row on medium screens (tablet landscape)
      lg={6}    // 4 cards per row on large screens (desktop)
      xl={6}    // 4 cards per row on wide desktops
    >
      <UserCard user={user} onEdit={handleEdit} />
    </Col>
  ))}
</Row>


      {/* Edit Modal */}
      <Modal
        title="Edit User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {editingUser && (
          <Form
            layout="vertical"
            initialValues={editingUser}
            onFinish={handleFormSubmit}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Website" name="website">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default App;


