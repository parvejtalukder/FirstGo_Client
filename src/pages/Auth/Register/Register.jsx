import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
// import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, registerUser, updateUser } = useAuth();
    const axios = useAxiosSecure();
    const from = location.state?.from?.pathname || "/";

    const handleRegistration = (data) => {

        console.log(data);
        const profileImage = data.photo[0];

        registerUser(data.email, data.password)
            .then(res => {

                // image proccess
                console.log(res);
                const formData = new FormData();
                formData.append("image", profileImage);

                const apiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost}`;
                axios.post(apiUrl, formData)
                .then(resImg => {
                    console.log(resImg.data);

                    const userProfile = {
                        displayName: data.name,
                        photoURL: resImg.data.data.display_url

                    }

                    updateUser(userProfile)
                    .then(updateRes => {

                        const userInfo = {
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            email: user.email,
                        }

                        axios.post("/user", userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                console.log("User in db");
                            } 
                        })
                        .catch((err) => {
                            console.log("Error ", err);
                        })

                        console.log("Image uploaded!", updateRes);
                        navigate(from, { replace: true });
                    })
                    .catch(uploadErr => {
                        console.log(uploadErr);
                    })


                })
                .catch(errImg => {
                    console.log(errImg);
                } )

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

                    <h2 className='font-bold text-3xl'>Registration</h2>
                    
                    <label className="label block">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="input w-full"
                        placeholder="Your Name"
                    />
                    {errors.name?.type == "required" && (
                        <p className='text-red-600 text-sm'>No Name Found...</p>
                    )}
                    
                    <label className="label block">Photo</label>
                    <input
                        type="file"
                        {...register("photo", { required: true })}
                        className="file-input w-full"
                        placeholder="Your Photo"
                    />
                    {errors.photo?.type == "required" && (
                        <p className='text-red-600 text-sm'>No Name Found...</p>
                    )}

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
                    <label htmlFor="">Already have account? <span><Link state={location?.state} className='text-blue-600' to={"/login"}>Login</Link></span></label>

                </fieldset>
            </form>
        </div>
    );
};

export default Register;