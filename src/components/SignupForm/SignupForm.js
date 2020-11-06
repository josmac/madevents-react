import React, { useState } from "react";
import { createUser } from "../../services/api-client";
import NavBar from "../NavBar/NavBar";
import "./SignupForm.css";
import Footer from "../Footer/Footer";

const SignupForm = () => {
  const [state, setState] = useState({
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      avatar: null,
    },
  });

  const { data } = state;
  console.log(data);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await createUser(data);
      console.log("user created", user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setState((prev) => {
      return {
        data: {
          ...prev.data,
          [name]: files ? files[0] : value,
        },
      };
    });
  };

  return (
    <div>
      <NavBar />

      <div className="container">
        <div className="row justify-content-center mt-4">
          <div classname="col-6">
            <div className="avatar">
              {data.avatar && (
                <img
                  src={URL.createObjectURL(data.avatar)}
                  alt="avatar"
                  className="w-50"
                  style={{ width: "20px" }}
                />
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="avatar">Avatar</label>
                <input
                  onChange={handleChange}
                  name="avatar"
                  type="file"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">Nombre</label>

                <input
                  value={data.firstName}
                  onChange={handleChange}
                  name="firstName"
                  type="text"
                  className="form-control"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Apellidos</label>

                <input
                  value={data.lastName}
                  onChange={handleChange}
                  name="lastName"
                  type="text"
                  className="form-control"
                  placeholder="Tus apellidos"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  value={data.email}
                  onChange={handleChange}
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Tu email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>

                <input
                  value={data.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Tu contraseña"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;
