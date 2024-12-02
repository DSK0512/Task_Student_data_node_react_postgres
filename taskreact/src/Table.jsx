import React, { useEffect, useState } from "react";
import "./table.css";
import axios from "axios";
import { Info, Trash, X } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Table = () => {
  const getAll = async () => {
    try {
      let data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}students/`,
        {}
      );

      if (data.status == 200) {
        setData(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Alert!",
        icon: "warning",
        text: "Are you sure you want to delete this Student?",
        showCancelButton: true,
        confirmButtonText: "Delete it",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.post(
            `${process.env.REACT_APP_BASE_URL}students/delete/${id}`,
            {}
          );
          toast.success("Deleted Successfully");
          getAll();
        }
      });
    } catch (er) {
      console.log(er);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAssign = (data) => {
    setIsOpen(true);
    setFormData({
      name: data.name,
      email: data.email,
      dob: data.dob,
    });
  };

  const handleInfo = async (id) => {
    let { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}students/byId/${id}`,
      // `http://localhost:4000/students/byId/${id}`,
      {}
    );

    if (data.code == 200) {
      setInfoData({
        id: data.data[0].student_id,
        name: data.data[0].student_name,
        subject: data.data[0].subject != null ? data.data[0].subject : "NA",
        marks: data.data[0].mark != null ? data.data[0].mark : "NA",
      });
    }
    setIsOpenInfo(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    try {
      let payload = {
        ...formData,
      };

      let data = await axios.post(
        `${process.env.REACT_APP_BASE_URL}students/`,
        payload,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
  }, []);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    age: "",
  });
  const [infoData, setInfoData] = useState({
    id: "",
    name: "",
    subject: "",
    marks: "",
  });

  return (
    <div>
      <div className="table-container">
        <div>
          <div>
            <h1>Student Table</h1>
          </div>
        </div>
        <div className="addButton">
          <button onClick={() => setIsOpen(true)}>Add</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.dob.split("T")[0]}</td>
                <td>{row.age}</td>
                <td>
                  <div className="action-class">
                    <Trash
                      className="cursor-pointer"
                      size={16}
                      color="red"
                      onClick={() => handleDelete(row.id)}
                    />
                    <Info
                      className="cursor-pointer"
                      size={16}
                      color="green"
                      onClick={() => handleInfo(row.id)}
                    />
                    {/* <button onClick={() => handleAssign(row)}>Update</button> */}
                    {/* <button onClick={() => handleDelete(row.id)}>Delete</button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div
                onClick={() => closeModal()}
                className="close-icon cursor-pointer"
              >
                <X size={16} />
              </div>
              <h2>Add Student</h2>
              <form>
                <div className="form-group">
                  <label>Member Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Member Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Member Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Member Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button onClick={() => handleSubmit()}>Submit</button>
              </form>
              {/* <button className="close-btn" onClick={() => closeModal()}>
                Close
              </button> */}
            </div>
          </div>
        )}

        {isOpenInfo && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div
                onClick={() => setIsOpenInfo(false)}
                className="close-icon cursor-pointer"
              >
                <X size={16} />
              </div>
              <h2>Student's Details</h2>
              <form>
                <div className="form-group">
                  <label>Member ID : {infoData.id}</label>
                </div>
                <div className="form-group">
                  <label>Member Name : {infoData.name}</label>
                </div>
                <div className="form-group">
                  <label>Member Subject : {infoData.subject}</label>
                </div>
                <div className="form-group">
                  <label>Member Mark : {infoData.marks}</label>
                </div>
              </form>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Table;
