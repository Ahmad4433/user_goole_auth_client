import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import useGeneral from "../hooks/useGeneral";
import {
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { IoMdPersonAdd } from "react-icons/io";
import {
  ArrowBack,
  Google,
  Padding,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import toast from "react-hot-toast";
import { loginWithGoogle } from "../utils/loginWithGoogle";
const Register = () => {
  const [visible, setVisible] = useState(false);
  const visibleHandler = () => {
    setVisible(!visible);
  };
  const { navigate, loading, setLoading } = useGeneral();

  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string()
      .email("must be a valid email")
      .required("email is required"),
    password: Yup.string()
      .min(6, "minimmum 6 characters long")
      .required("password is required"),
  });

  const submitHandler = async (values) => {
    const data = {
      url: apis().registerUser,
      method: "POST",
      body: { ...values },
    };
    setLoading(true);
    const result = await httpAction(data);
    setLoading(false);
    if (result?.status) {
      toast.success(result?.message);
      navigate("/login");
    }
  };

  return (
    <div className="page_card">
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({
          handleBlur,
          handleChange,
          validateField,
          values,
          touched,
          errors,
        }) => (
          <Form>
            <div className="container-fuild">
              <div className="row g-3">
                <div className="col-12 page_header">
                  <IoMdPersonAdd />
                  <p>Create new account</p>
                  <span>Sign up to continue</span>
                </div>
                <div className="col-12">
                  <TextField
                    type="text"
                    name="name"
                    label="Full name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col-12">
                  <TextField
                    name="email"
                    label="Email"
                    value={values.email}
                    type="emai"
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>
                <div className="col-12">
                  <TextField
                    name="password"
                    type={visible ? "text" : "password"}
                    label="Password"
                    value={values.password}
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={visibleHandler} edge="end">
                            {visible ? <VisibilityOff /> : <Visibility />}
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
                    fullWidth
                  >
                    Sign up
                  </Button>
                </div>
                <div className="col-12">
                  <Divider>OR</Divider>
                </div>
                <div className="col-12">
                  <Button
                    onClick={loginWithGoogle}
                    fullWidth
                    variant="outlined"
                    endIcon={<Google />}
                  >
                    continue with google
                  </Button>
                </div>
                <div className="col-12">
                  <Button
                    onClick={() => navigate("/login")}
                    fullWidth
                    startIcon={<ArrowBack />}
                    variant="outlined"
                  >
                    back to login
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

export default Register;
