import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  GetCitiesByState,
  getCountry,
  GetStatebyCountry,
  signUp,
} from "../../redux/action";
import * as Yup from "yup";
import swal from "sweetalert";
import "../User/User.css";
import { Widget } from "@uploadcare/react-widget";
import styled, { css } from "styled-components";
import profile from "../../images/imgProfile.png";

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ image }) =>
    image
      ? css`
          & .image {
            height: 300px;
            width: 300px;
            border-radius: 50%;
            overflow: hidden;

            img {
              height: 100%;
              width: 300px;
            }
          }

          & .uploadcare--widget {
          }
        `
      : css`
          & .image {
            display: none;
          }
        `}

  & .uploadcare--widget__button_type_open {
    height: 200px;
    width: 200px;
    border-radius: 100%;
    background: none;
    color: var(--main-extra-color);
  }
`;
const UserRegister = () => {
  const today = new Date();
  //Preset for Image
  const [image, setImage] = React.useState(null);
  const [url, seturl] = React.useState(null);
  const widgetApi = React.useRef();
  console.log("here", widgetApi);
  const translation = {
    buttons: {
      choose: {
        images: {
          one: `<div className="image"><img src=${profile} width="100px" alt="camera" /><br/>Upload photo</div>`,
        },
      },
    },
  };
  // let imagen = `https://ucarecdn.com/${url?.url}/${url?.name}`;

  //Input values
  const initialValues = {
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    address: "",
    age: "",
    document: "",
    phone2: "",
    state: "",
    city: "",
    country: "",
    photo: "",
  };

  //Validation using Yup
  const validationSchema = Yup.object({
  
  });

  //Hooks for Redux
  const dispatch = useDispatch();

  const country = useSelector((state) => state.country);
  const states = useSelector((state) => state.states);
  const cities = useSelector((state) => state.cities);
  const register = useSelector((state) => state.userRegister);

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    dispatch(signUp(values));
    resetForm();
    console.log(values);
  };

  const onClick = () => {
    if (register?.message === "User existent") {
      swal({
        title: register?.message,
        text: "Por Favor Intente Nuevamente",
      });
      dispatch(clear());
    } else if (register?.message === "User created") {
      swal({
        title: register?.message,
        text: "Por favor revise su correo, se ha enviado un link de verificación",
      }).then(() => {
        window.location = "https://deploy-click-care.vercel.app/welcome";
      });
      dispatch(clear());
    }
    // alert("Felicidades se Completó el Registro.");
    // alert("Se envió la confirmación a su email.");
  };
  onClick();

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);
function prueba(){
  console.log(initialValues)
}
  return (
    <div className="container-img-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
       
            <Form onChange={prueba}>
             

              <div className="sign-spaces">
                <label className="sign-label">Nombres*:</label>
                <Field
                  className="sign-inputs"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="name"
                />
              </div>
              
              
              
             
              
              

              
              

      

              
            
               
              

              <div className="sign-button">
                <button
                  className="buttonOne principalButton"
                  type="submit"
                  onSubmit={onSubmit}
                >
                  Registra tu Usuario
                </button>
              </div>
            </Form>
         
      </Formik>
    </div>
  );
};
export default UserRegister;
