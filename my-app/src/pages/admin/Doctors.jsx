import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  //getdoctors
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle account status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        // window.location.reload()
        getDoctors();
        alert(res.data.message);
        getDoctors();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);
  //antd table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        // <div className='d-flex'>
        //     { record.status === "pending" ? <button className="btn btn-success" onClick={()=> handleAccountStatus(record, "approved")}>Approve</button> : <button className="btn btn-danger" onClick={()=> handleAccountStatus(record, "rejected")}>Reject</button>}

        // </div>
        <div className="d-flex">
          {record.status === "pending" && (
            <>
              <button
                className="btn btn-success me-2"
                onClick={() => handleAccountStatus(record, "approved")}
              >
                Approve
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleAccountStatus(record, "rejected")}
              >
                Reject
              </button>
            </>
          )}

          {record.status === "approved" && (
            <button
              className="btn btn-danger"
              onClick={() => handleAccountStatus(record, "rejected")}
            >
              Reject
            </button>
          )}

          {record.status === "rejected" && (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">All doctors</h1>
      {/* <Table/> */}
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
