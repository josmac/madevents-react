import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { login } from "../../services/api-client";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./LoginForm.css";

const validations = {
  email: (v) => v.length,
  password: (v) => v.length,
};

const LoginForm = () => {
  const [state, setState] = useState({
    data: {
      email: "",
      password: "",
    },
    error: {
      email: true,
      password: true,
    },
    touch: {},
  });

  const [loginError, setLoginError] = useState(null);

  const authContext = useAuthContext();

  const { data, error, touch } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await login(data);

      authContext.login(user);
    } catch (err) {
      setLoginError(err.response?.data?.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    const validationFn = validations[name];
    const isValid = validationFn(value);

    setState((prev) => {
      return {
        ...prev,
        data: {
          ...prev.data,
          [name]: value,
        },
        error: {
          ...prev.error,
          [name]: !isValid,
        },
      };
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setState((prev) => {
      return {
        ...prev,
        touch: {
          ...touch,
          [name]: true,
        },
      };
    });
  };

  const isError = Object.values(error).some((err) => err);

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="col-6">
            {loginError && (
              <div className="alert alert-danger">{loginError}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Email</label>

                <input
                  value={data.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  type="text"
                  className={`form-control ${
                    touch.email && error.email ? "is-invalid" : ""
                  }`}
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tagline">Contraseña</label>

                <input
                  name="password"
                  value={data.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  className={`form-control ${
                    touch.password && error.password ? "is-invalid" : ""
                  }`}
                  placeholder="Contraseña"
                />

                <div className="invalid-feedback">Credenciales no válidas</div>
              </div>

              <button
                type="submit"
                className="btn btn-primary mr-3 btn-block"
                disabled={isError}
              >
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

export default LoginForm;
