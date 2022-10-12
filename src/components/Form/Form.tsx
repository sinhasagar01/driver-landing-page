
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import "./form.css";

import { Select } from '../Select/Select';
import { useState } from 'react';

const cityName = [
  { label: "Tallin", value: 1 },
  { label: "London", value: 2 },
  { label: "Berlin", value: 3 },
  { label: "Delhi", value: 4 },
  { label: "Bucharest", value: 5 },
]
const countryCode = [
  { label: "+372", value: 1 },
  { label: "+355", value: 2 },
  { label: "+91", value: 3 },
  { label: "+358", value: 4 },
  { label: "+48", value: 5 },
]

type UserSubmitForm = {
  email: string;
  phoneNumber: string;
  countryCode: number;
  city: string;
  acceptTerms: boolean;
};

const FormComponent: React.FC = () => {
  const [valueCity, setValueCity] = useState<typeof cityName[0] | any>(cityName[0]);
  const [valueCountry, setValueCountry] = useState<typeof countryCode[0] | any>(countryCode[0]);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is required'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone is required'),
    acceptTerms: Yup.bool().required().oneOf([true], ' ')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div className="register-form">
      <h4>Become a Bolt Driver</h4>
      <p>If you have multiple car or drivers <a href='#'>sign up as fleet owner</a></p>

      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            {...register('email')} className={`input-styles ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
          />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Phone</Form.Label>
          <InputGroup className={`${errors.phoneNumber ? 'is-invalid' : ''}`} >
            <Select options={countryCode} value={valueCountry} onChange={opt => setValueCountry(opt)}/>

            <Form.Control
              type="number"
              className={`inputPhone ${errors.phoneNumber ? 'is-invalid' : ''}`}
              {...register('phoneNumber')} 
              placeholder="Phone"
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneNumber?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>


        <Form.Group className="form-group">
          <Form.Label>City</Form.Label>
          <Select options={cityName} value={valueCity} onChange={opt => setValueCity(opt)}/>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Check
            {...register('acceptTerms')}
            isInvalid={!!errors.acceptTerms}
            label={
              <>
                I agree to Bolt's &nbsp;<a href="#" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>&nbsp; and &nbsp;<a href='#'>Privacy Policy</a>
              </>
            }
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Button className="btn btn-primary" type="submit">Sign up as a Driver</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default FormComponent;
