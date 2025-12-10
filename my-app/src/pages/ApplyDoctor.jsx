import React from 'react';
import Layout from '../components/Layout';
import { Row, Col, Input, Form, TimePicker, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';


const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //handle form 
  const handleFinish = async(values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/apply-doctor', {...values, userId: user._id},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success('Application Submitted Successfully')
        navigate('/') 
      } else {
        message.error(res.data.message)
      }

    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error('Something went wrong');
    }

    console.log(values);
  };

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4>Personal Details</h4>

        {/*  Each Row has 2 fields side by side */}
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>

          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Col>

          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label="Website"
              name="website"
              rules={[{ required: true, message: 'Please enter your website' }]}
            >
              <Input placeholder="Website" />
            </Form.Item>
          </Col>

          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>

        <h4>Professional Details</h4>

        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true, message: 'Please enter specialization' }]}
            >
              <Input placeholder="E.g. Cardiologist" />
            </Form.Item>
          </Col>

          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true, message: 'Please enter years of experience' }]}
            >
              <Input placeholder="Experience in years" />
            </Form.Item>
          </Col>
        </Row>

         <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label="Fee Per Consultation"
              name="feesPerCunsaltation"
              rules={[{ required: true, message: 'Please enter specialization' }]}
            >
              <Input placeholder="your contact no" />
            </Form.Item>
          </Col>

          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label="Timings"
              name="timings"
              rules={[{ required: true, message: 'Please enter years of experience' }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <button type="submit" className="btn btn-primary">
            Apply Doctor
          </button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
