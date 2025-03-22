import React from "react";
import {
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FaArrowRotateRight } from "react-icons/fa6";
import { ArrowBack, Send } from "@mui/icons-material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import useGeneral from "../hooks/useGeneral";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import toast from "react-hot-toast";
const ForgetPassword = () => {
  const initialState = {
    email: "",
  };
  const { navigate, loading, setLoading } = useGeneral();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("must be a valid email")
      .required("email is required"),
  });

  const submitHandler = async (values) => {
    const data = {
      url: apis().forgetPassword,
      method: "POST",
      body: { email: values.email },
    };
    setLoading(true);
    const result = await httpAction(data);
    setLoading(false);
    if (result?.status) {
      toast.success(result?.message);
      navigate("/otp/verify");
    }
  };

  return (
    <div className="page_card">
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleBlur, handleChange, values, touched, errors }) => (
          <Form>
            <div className="container-fluid">
              <div className="row g-3">
                <div className="col-12 page_header">
                  <FaArrowRotateRight />
                  <p>Find your account</p>
                  <span>enter your registered email</span>
                </div>
                <div className="col-12">
                  <TextField
                    type="email"
                    name="email"
                    label="Registered Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="col-12">
                  <Button
                    endIcon={
                      loading ? <CircularProgress size={18} /> : <Send />
                    }
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                  >
                    Send OTP
                  </Button>
                </div>
                <div className="col-12">
                  <Button
                    onClick={() => navigate("/login")}
                    startIcon={<ArrowBack />}
                    variant="outlined"
                    fullWidth
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

export default ForgetPassword;
