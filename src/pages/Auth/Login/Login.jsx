import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {

        const { register, handleSubmit, formState: { errors } } = useForm();
        const { signInUser } = useAuth();
        const location = useLocation();
        const navigate = useNavigate();
        const from = location.state?.from?.pathname || "/";
    
        const handleLogin = (data) => {
            signInUser(data.email, data.password)
                .then(res => {
                    console.log(res.user);
                     navigate(from, { replace: true });
                })
                .catch(err => {
                    console.log(err);
                })
        }

    return (
        <div className="flex justify-center items-center w-full px-4">
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="w-full max-w-sm sm:max-w-md"
            >
                <h2 className='text-3xl font-bold'>Welcome Back!</h2>
                <h2 className='text-sm  pb-2'>Please, Login Here...</h2>
                <fieldset className="fieldset space-y-3 w-full">
                    <label className="label block">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="input w-full"
                        placeholder="Email"
                    />
                    {errors.email?.type == "required" && (
                        <p className='text-red-600 text-sm'>No Email Found...</p>
                    )}

                    <label className="label block">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                        className="input w-full"
                        placeholder="Password"
                    />

                    {errors.password?.type === "required" && (
                        <p className="text-red-600 text-sm">Password required...</p>
                    )}

                    <button className="btn btn-neutral mt-4 w-full">
                        Login
                    </button>
                </fieldset>
                <h2>Already have an account? <span><Link state={location?.state} to={"/register"} className='text-blue-500'>Register</Link></span></h2>
            </form>
        </div>
    );
};

export default Login;