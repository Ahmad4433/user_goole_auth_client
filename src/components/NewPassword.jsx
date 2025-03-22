import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import { MdOutlineUpdate } from "react-icons/md";
import { ArrowBack } from "@mui/icons-material";
import useGeneral from "../hooks/useGeneral";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import toast from "react-hot-toast";

const NewPassword = () => {
  const { navigate, loading, setLoading } = useGeneral();

  const initialState = {
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "must be 6 characters long")
      .required("password is required"),
  });

  const submitHandler = async (values) => {
    const data = {
      url: apis().upadtePassword,
      method: "POST",
      body: { password: values.password },
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
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({ handleBlur, handleChange, values, errors, touched }) => (
          <Form>
            <div className="container-fluid">
              <div className="row g-3">
                <div className="col-12 page_header">
                  <MdOutlineUpdate />
                  <p>Change password</p>
                  <span>create a new password</span>
                </div>
                <div className="col-12">
                  <TextField
                    type="text"
                    name="password"
                    label="New Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    fullWidth
                    size="small"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </div>
                <div className="col-12">
                  <Button
                    endIcon={loading && <CircularProgress size={16} />}
                    disabled={loading}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    change password
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPassword;
