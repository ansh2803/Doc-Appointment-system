import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Row, Col, Input, Form, TimePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { message } from "antd";
// import moment from "moment";
import dayjs from "dayjs";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get doctor info for the logged-in user
  const getDoctorInfo = async () => {
    if (!user?._id) return;
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        // setDoctor(res.data.data);
        message.success(res.data.message);
        setDoctor(res.data.data);
        // navigate("/")
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  // handle form submit
  const handleFinish = async (values) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            values.timings[0].format("HH:mm"),
            values.timings[1].format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        alert("Profile Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1>Manage profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          // initialValues={{...doctor, timings:[
          //   moment(doctor.timings[0], "HH:mm"),
          //   moment(doctor.timings[1], "HH:mm"),
          // ]}}
          initialValues={{
            ...doctor,
            timings:
              doctor.timings?.length === 2
                ? [
                    dayjs(doctor.timings[0], "HH:mm"),
                    dayjs(doctor.timings[1], "HH:mm"),
                  ]
                : [],
          }}
        >
          <h4>Personal Details</h4>

          {/*  Each Row has 2 fields side by side */}
          <Row gutter={16}>
            <Col lg={8} md={12} sm={24}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>

            <Col lg={8} md={12} sm={24}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
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
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>

            <Col lg={8} md={12} sm={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
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
                rules={[
                  { required: true, message: "Please enter your website" },
                ]}
              >
                <Input placeholder="Website" />
              </Form.Item>
            </Col>

            <Col lg={8} md={12} sm={24}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
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
                rules={[
                  { required: true, message: "Please enter specialization" },
                ]}
              >
                <Input placeholder="E.g. Cardiologist" />
              </Form.Item>
            </Col>

            <Col lg={8} md={12} sm={24}>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[
                  {
                    required: true,
                    message: "Please enter years of experience",
                  },
                ]}
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
                rules={[
                  { required: true, message: "Please enter specialization" },
                ]}
              >
                <Input placeholder="your contact no" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col lg={8} md={12} sm={24}>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <button type="submit" className="btn btn-primary">
              update
            </button>
          </Form.Item>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
