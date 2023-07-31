import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';


function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage("")
      }, []);

    const initialValues = {
        username: "",
        password: "",
        password2: "",
    }

    const validationSchema = Yup.object({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
        password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const onSubmit = (data) => { 
        var postData = {username: data.username, password: data.password};
        axios.post("http://localhost:3001/users/register", postData).then((response) => {
          if (response.data.success === false) {
            setErrorMessage("Username already exists")
          }else{
            navigate('/login')
          };
        });
    };

    return (
        <div className="registerContainer">       
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='registerForm'>
                <label>Username: </label>
                <ErrorMessage name="username" component="span" />
                <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="username"
                    placeholder="(Ex. John123...)"
                />
        
                <label>Password: </label>
                <ErrorMessage name="password" component="span" />
                <Field
                    autocomplete="off"
                    type="password"
                    id="inputCreatePost"
                    name="password"
                    placeholder="Your Password..."
                />

                <label>Confirm Password: </label>
                <ErrorMessage name="password2" component="span" />
                <Field
                    autocomplete="off"
                    type="password"
                    id="inputCreatePost"
                    name="password2"
                    placeholder="Confirm Password..."
                />
        
                <button type="submit"> Register </button>
                {errorMessage && <div className="registerError"> {errorMessage} </div>}
                </Form>
            </Formik>
            
        </div>
    );
}

export default Register;