const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");
const getDoctorInfoConroller = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res
      .status(200)
      .send({ message: "Doctor Info Fetched", success: true, data: doctor });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in get doctor info", success: false, error });
  }
};
//update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res
      .status(200)
      .send({ message: "Doctor Profile Updated", success: true, data: doctor });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in update profile", success: false, error });
  }
};

//get doctor by id
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res
      .status(200)
      .send({ message: "Doctor Data Fetched", success: true, data: doctor });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in get doctor by id", success: false, error });
  }
};
const doctorAppointmentController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.user.id });
    const appointments = await appointmentModel.find({ doctorId: doctor._id });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findOneAndUpdate(
      { _id: appointmentsId },
      { status },
      { new: true }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    user.Notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update Status",
    });
  }
};
module.exports = {
  getDoctorInfoConroller,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentController,
  updateStatusController,
};
