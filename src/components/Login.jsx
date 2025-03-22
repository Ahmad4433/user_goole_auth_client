import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useGeneral from "../hooks/useGeneral";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { IoIosLogIn } from "react-icons/io";
import {
  Api,
  ArrowBack,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { loginWithGoogle } from "../utils/loginWithGoogle";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const { navigate, loading, setLoading } = useGeneral();
  const initialState = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  const submitHandler = async (values) => {
    const data = {
      url: apis().loginUser,
      method: "POST",
      body: { ...values },
    };
    setLoading(true);
    const result = await httpAction(data);
    setLoading(false);
    if (result?.status) {
      navigate("/");
    }
  };

  const loginWithGoogleHandler = async () => {
    loginWithGoogle();
  };

  return (
    <div className="page_card">
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleBlur, handleChange, errors, touched, values }) => (
          <Form>
            <div className="container-fluid">
              <div className="row g-3">
                <div className="col-12 page_header">
                  <IoIosLogIn />
                  <p>Welcome back</p>
                  <span>Login to continue</span>
                </div>

                <div className="col-12">
                  <TextField
                    type="email"
                    name="email"
                    label="Your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col-12">
                  <TextField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="Your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="col-12">
                  <Button
                    disabled={loading}
                    endIcon={loading && <CircularProgress size={16} />}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Login
                  </Button>
                </div>

                <div className="col-12">
                  <Divider>OR</Divider>
                </div>

                <div className="col-12">
                  <Button
                    onClick={loginWithGoogleHandler}
                    fullWidth
                    variant="outlined"
                    endIcon={<Google />}
                  >
                    Google
                  </Button>
                </div>
                <div className="col-12">
                  <Button
                    onClick={() => navigate("/register")}
                    fullWidth
                    startIcon={<ArrowBack />}
                    variant="outlined"
                  >
                    create a new account
                  </Button>
                </div>

                <div className="col-12">
                  <Button
                    onClick={() => navigate("/password/forgot")}
                    sx={{
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                    fullWidth
                    variant="text"
                    color="error"
                  >
                    forgotten password?
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
