import React from "react";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, DatePicker, message, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState(null);
  const [date, setDate] = useState();
  const [timings, setTimings] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //booking func
  const handleBooking = async () => {
    try {
     // setIsAvailable(true);
      if (!date && !timings) {
        return alert("Date and Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          // time: timings ? timings.join(" - ") : "",
          time: timings ? timings[0] : "",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Appointment Booked Successfully");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // if(res.data.sucess){
      //   message.success(res.data.message)
      // }
      console.log(error);
      message.error("something went wrong");
    }
  };

  //  const handleAvailability = async() => {
  //   try {
  //     dispatch(showLoading())
  //     const res = await axios.post('/api/v1/user/book-appointment',
  //     {doctorId:params.doctorId,date,time},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     }
  //     );
  //     dispatch(hideLoading());
  //     if(res.data.success){
  //     setIsAvailable(true)
  //     message.success(res.data.message)
  //   } else{
  //     setIsAvailable(false)
  //     message.error(res.data.message)
  //     }
  //   catch(error) {
  //     dispatch(hideLoading())
  //     console.log(error)
  //     message.error("Something went wrong");
  //   }
  // };
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        {
          doctorId: params.doctorId,
          date,
          time: timings ? timings.join(" - ") : "",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        setIsAvailable(false);
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Booking page</h1>
      <div className="container">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.feesPerCunsaltation}</h4>
            <h4>
              Timings: {doctors?.timings?.[0]} - {doctors?.timings?.[1]}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setIsAvailable(false);
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker.RangePicker
                format="HH:mm"
                className="m-2"
                onChange={(values) => {
                  setIsAvailable(false);
                  setTimings([
                    moment(values[0]).format("HH:mm"),
                    moment(values[1]).format("HH:mm"),
                  ]);
                }}
              />
              <button
                className="btn btn-primary mt-2 "
                onClick={handleAvailability}
              >
                check Availabilty
              </button>
              {/* <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button> */}
              {!isAvailable && (
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
