import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {

    const {register, handleSubmit, formState:{errors}} = useForm();
    const handleRegistration = (data) => {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input type="email" {...register("email", {required: true})} className="input" placeholder="Email" />
                  {errors.email?.type == "required" && <p className='text-red'>No Email Found</p>}
                  <label className="label">Password</label>
                  <input type="password" {...register("password")} className="input" placeholder="Password" />
                  <div><a className="link link-hover">Forgot password?</a></div>
                  <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;