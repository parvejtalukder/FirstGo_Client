import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser } = useAuth();

    const handleRegistration = (data) => {
        registerUser(data.email, data.password)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="flex justify-center items-center w-full px-4">
            <form
                onSubmit={handleSubmit(handleRegistration)}
                className="w-full max-w-sm sm:max-w-md"
            >
                <fieldset className="fieldset space-y-4 w-full">
                    <label className="label block">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="input w-full"
                        placeholder="Email"
                    />
                    {errors.email?.type == "required" && (
                        <p className='text-red-600 text-sm'>No Email Found</p>
                    )}

                    <label className="label block">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
                        })}
                        className="input w-full"
                        placeholder="Password"
                    />

                    {errors.password?.type === "required" && (
                        <p className="text-red-600 text-sm">Password required...</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className="text-red-600 text-sm">Password must be at least 6 characters...</p>
                    )}
                    {errors.password?.type === "pattern" && (
                        <p className="text-red-600 text-sm">
                            Password not strong enough (uppercase, lowercase, number, special character)...
                        </p>
                    )}

                    <button className="btn btn-neutral mt-4 w-full">
                        Register
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;