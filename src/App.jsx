import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Title } = Typography;
const { TextArea } = Input;

const App = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);

    const serviceID = 'service_g6nh8fa';
    const templateID = 'template_8e0njb6';
    const publicKey = 'l8LAytz9RiQNHR-QR';

    emailjs
      .send(serviceID, templateID, values, publicKey)
      .then(
        (response) => {
          console.log('SUCCESS', response.status, response.text);
          message.success('Pesan berhasil terkirim!');
          form.resetFields();
          setLoading(false);
        },
        (err) => {
          console.log('FAILED....', err);
          message.error('Gagal mengirim pesan. Silakan coba lagi nanti');
          setLoading(false);
        }
      );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'rgba(240, 242, 245, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: 480,
          borderRadius: 12,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
          Contact Us
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label="Nama"
            rules={[
              { required: true, message: 'Masukkan nama' },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Masukkan nama"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Masukkan email' },
              { type: 'email', message: 'Masukkan email yang valid' },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Masukkan email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="message"
            label="Pesan"
            rules={[
              { required: true, message: 'Masukkan pesan' },
              { min: 10, message: 'Pesan harus terdiri dari minimal 10 karakter' },
            ]}
          >
            <TextArea
              placeholder="Masukkan pesan"
              rows={4}
              style={{ resize: 'none' }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{
                height: 48,
                borderRadius: 8,
                fontWeight: 600,
                background: 'rgb(24, 144, 255)',
                border: 'none',
              }}
            >
              {loading ? 'Mengirim...' : 'Kirim Pesan'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default App;