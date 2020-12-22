import React from 'react';
import { Form, Formik, useField } from 'formik';
import './App.css';
import {Styles} from './Styles';

import * as Yup from 'yup';

const CustomTextInput = ({ label , ...props} ) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={ props.id || props.name }>{label}</label>
      <input className="text-input" {...field} {...{props}}></input>
      { meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

const CustomSelect = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={ props.id || props.name }>{label}</label>
      <select {...field} {...props} />
      { meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}

    </>
  )
} 

const CustomCheckbox = ({children, ...props}) => {
  const [field, meta] = useField(props, 'checkout');
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      { meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ): null}
    </>
  )
}
function App() {

  return (
    <Styles>
      <Formik
        initialValues={{
          name: '',
          email: '',
          acceptedTerms: false,
          specialPower: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
                .min(3, 'Must be at least 3 charaters')
                .max(15, 'Must be less than 15 characters')
                .required(),
          email: Yup.string()
                .email('Invalid Email')
                .required('Required'),
          acceptedTerms: Yup.boolean()
                        .required('Required'),
          specialPower: Yup.string()
                        .oneOf(['flight','vision','fire','ice','one punch'],'Invalid Power')
                        .required('Required'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);

          },3000)
          
        }}
      >
        {props => (
          <Form>
            <CustomTextInput label="Name" name="name" type="text" placeholder="Frank"/>
            <CustomTextInput label="Email" name="email" type="email" placeholder="frankec@ec.com"/>
            <CustomSelect label="Special Power" name="specialPower">
              <option value="">Select a special power</option>
              <option value="flight">Flight</option>
              <option value="vision">Vision</option>
              <option value="fire">Fire</option>
              <option value="ice">Ice</option>
              <option value="one punch">One Punch</option>
            </CustomSelect>
            <CustomCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </CustomCheckbox>
          </Form>
        )}
        
        
      </Formik>
    </Styles>
  );
}

export default App;
