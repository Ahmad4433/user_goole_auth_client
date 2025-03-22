import { TextField, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineVerified } from "react-icons/md";
import { ArrowBack } from "@mui/icons-material";
import Countdown from "react-countdown";
import useGeneral from "../hooks/useGeneral";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import toast from "react-hot-toast";

const Verification = () => {
  const { navigate, loading, setLoading } = useGeneral();
  const [otpTime, setOtpTime] = useState(2 * 60 * 1000);
  const [user, setUser] = useState("");

  const initialState = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const validationSchema = Yup.object({
    otp1: Yup.number().required(),
    otp2: Yup.number().required(),
    otp3: Yup.number().required(),
    otp4: Yup.number().required(),
    otp5: Yup.number().required(),
    otp6: Yup.number().required(),
  });

  const otpChangeHandler = (value, setFieldValue, item, index) => {
    setFieldValue(item, value);
    if (value && index > 0 && index < 6) {
      const element = document.getElementById(index + 1);
      setTimeout(() => {
        element.focus();
      }, 30);
    }
  };
  const getOtpTime = async () => {
    const data = {
      url: apis().getOtpExpTime,
    };
    setLoading(true);
    const result = await httpAction(data);
    setLoading(false);
    if (result?.status) {
      setOtpTime(result?.time);
      setUser(result?.email);
    }
  };
  useEffect(() => {
    getOtpTime();
  }, []);

  const submitHandler = async (values) => {
    const data = {
      url: apis().verifyOtp,
      method: "POST",
      body: {
        otp:
          values.otp1 +
          values.otp2 +
          values.otp3 +
          values.otp4 +
          values.otp5 +
          values.otp6,
      },
    };
    setLoading(true);
    const result = await httpAction(data);
    setLoading(false);
    if (result?.status) {
      toast.success(result?.message);
      navigate("/password/change");
    }
  };

  const otpInputs = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];
  useEffect(() => {
    document.getElementById("1").focus();
  }, []);

  const resendOtpHandler = async () => {
    const data = {
      url: apis().forgetPassword,
      method: "POST",
      body: { email: user },
    };
    setLoading(true);
    const result = await httpAction(data);
    setLoading(false);
    if (result?.status) {
      getOtpTime();
      toast.success(result?.message);
    }
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({
        handleBlur,
        handleChange,
        errors,
        touched,
        setFieldValue,
        values,
      }) => (
        <Form>
          <div className="page_card">
            <div className="container-fluid">
              <div className="row g-3">
                <div className="col-12 page_header">
                  <MdOutlineVerified />
                  <p>Verify OTP</p>
                  <span>
                    Enter the 6-digit OTP we just sent to your registered email
                  </span>
                </div>
                <div className="col-12 otp_container">
                  {otpInputs.map((item, index) => (
                    <TextField
                      id={index + 1}
                      value={values[item]}
                      key={index}
                      inputProps={{ maxLength: 1, pattern: "[0-9]*" }}
                      type="text"
                      onChange={(event) => {
                        const value = event.target.value.replace(/[^0-9]/g, "");
                        otpChangeHandler(value, setFieldValue, item, index + 1);
                      }}
                      onBlur={handleBlur}
                      error={touched[item] && Boolean(errors[item])}
                      name={item}
                      size="small"
                    />
                  ))}
                </div>
                <div className="col-12">
                  <Button
                    endIcon={loading && <CircularProgress size={16} />}
                    disabled={Object.values(values).some(
                      (value) => value === ""
                    )}
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Verify
                  </Button>
                </div>
                <div className="col-12">
                  <Button
                    onClick={() => navigate("/login")}
                    fullWidth
                    variant="outlined"
                    startIcon={<ArrowBack />}
                  >
                    back to login
                  </Button>
                </div>
                <div className="col-12">
                  {loading ? (
                    <CircularProgress size={14} />
                  ) : (
                    <Countdown
                      renderer={({ minutes, seconds, completed }) => {
                        if (completed) {
                          return (
                            <Button onClick={resendOtpHandler}>resend</Button>
                          );
                        } else {
                          return (
                            <span className="otp_timer">
                              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </span>
                          );
                        }
                      }}
                      date={Date.now() + otpTime}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Verification;
