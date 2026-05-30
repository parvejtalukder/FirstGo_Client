import React, { useState } from 'react';
import Image from '../../assets/agent-pending.png'
import { useForm } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BeARider = () => {
    
    const { user } = useAuth();
    const axios = useAxiosSecure();
    const [ selectedDivision, setDivision ] = useState("");
    const { register, handleSubmit, formState: {errors} } = useForm();

    const registerRider = (data) => {
        data.email = user.email;
        // console.log(data);
        axios.post("/be-a-rider", data)
        .then((res) => {
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Application sent successfully",
                    icon: "success",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });

            }
        })
        .catch((err) => {
            Swal.fire({
                title: "Application Submission Error!",
                icon: "warning",
                text: err,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });

        })
    }

    const bangladesh = {
      Barishal: [
        "Barguna",
        "Barishal",
        "Bhola",
        "Jhalokati",
        "Patuakhali",
        "Pirojpur"
      ],
      Chattogram: [
        "Bandarban",
        "Brahmanbaria",
        "Chandpur",
        "Chattogram",
        "Cumilla",
        "Cox's Bazar",
        "Feni",
        "Khagrachari",
        "Lakshmipur",
        "Noakhali",
        "Rangamati"
      ],
      Dhaka: [
        "Dhaka",
        "Faridpur",
        "Gazipur",
        "Gopalganj",
        "Kishoreganj",
        "Madaripur",
        "Manikganj",
        "Munshiganj",
        "Narayanganj",
        "Narsingdi",
        "Rajbari",
        "Shariatpur",
        "Tangail"
      ],
      Khulna: [
        "Bagerhat",
        "Chuadanga",
        "Jashore",
        "Jhenaidah",
        "Khulna",
        "Kushtia",
        "Magura",
        "Meherpur",
        "Narail",
        "Satkhira"
      ],
      Mymensingh: [
        "Jamalpur",
        "Mymensingh",
        "Netrokona",
        "Sherpur"
      ],
      Rajshahi: [
        "Bogura",
        "Jaipurhat",
        "Naogaon",
        "Natore",
        "Nawabganj",
        "Pabna",
        "Rajshahi",
        "Sirajganj"
      ],
      Rangpur: [
        "Dinajpur",
        "Gaibandha",
        "Kurigram",
        "Lalmonirhat",
        "Nilphamari",
        "Panchagarh",
        "Rangpur",
        "Thakurgaon"
      ],
      Sylhet: [
        "Habiganj",
        "Moulvibazar",
        "Sunamganj",
        "Sylhet"
      ]
    };
    const divisions = Object.keys(bangladesh);

    return (
        <div className='p-5 m-5 lg:p-8 lg:my-10 bg-white rounded-2xl flex flex-col gap-4'>
            <div className='max-w-2xl'>
                <h2 className='font-extrabold lg:text-3xl text-xl'>Be a Rider</h2>
                <p className="text-[13px] text-justify lg:text-[20px]">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='w-full flex justify-center items-center'>
                <div className='w-full h-full items-start p-6'>
                    <h2 className='font-bold text-xl'>Tell us about yourself</h2>
                        <form onSubmit={handleSubmit(registerRider)}>
                            <fieldset className="fieldset w-full">
                                
                                <label className="label">Name</label>
                                <input type="text" {
                                    ...register("name", {required: true})
                                } className="input w-full" disabled value={user.displayName} placeholder="Name" />
                                {errors.name?.type == "required" && <span className='flex items-start justify-start'><MdError></MdError> <p className="text-red-600">Please Enter Your Name.</p></span>}
                                
                                <label className="label">Driving Licence</label>
                                <input type="number" {
                                    ...register("licence", {required: true})
                                } className="input w-full" placeholder="Driving Licence" />
                                {errors.licence?.type == "required" && <span className='flex items-start justify-start'><MdError></MdError> <p className="text-red-600">Please Enter Your Driving Licence.</p></span>}

                                <label className="label">NID</label>
                                <input type="number" {
                                    ...register("nid", {required: true})
                                } className="input w-full" placeholder="NID" />
                                {errors.email?.type == "required" && <span className='flex items-start justify-start'><MdError></MdError> <p className="text-red-600">Please Enter Your NID.</p></span>}

                                <label className="label">Bike</label>
                                <input type="text" {
                                    ...register("bike", {required: true})
                                } className="input w-full" placeholder="Bike ID" />
                                {errors.email?.type == "required" && <span className='flex items-start justify-start'><MdError></MdError> <p className="text-red-600">Please Enter Your Bike ID.</p></span>}

                                <label className="label">Address</label>
                                <input type="text" {
                                    ...register("address", {required: true})
                                } className="input w-full" placeholder="Your full address" />
                                {errors.email?.type == "required" && <span className='flex items-start justify-start'><MdError></MdError> <p className="text-red-600">Please Enter Your Address.</p></span>}

                                <label className="label">Region</label>
                                <select
                                {...register("division", { required: true })} className="input w-full" onChange={(e) => setDivision(e.target.value)}>
                                    <option value="">Select Region</option>   
                                    {
                                        divisions.map((division, indx) => (
                                            <option key={indx} value={division}>{division}</option>
                                        ))
                                    }
                                </select>
                                {errors.division?.type == "required" && <span className='flex items-start justify-start'><MdError></MdError> <p className="text-red-600">Please Enter Your Division.</p></span>}

                                <label className="label">District</label>
                                <select
                                {...register("district", { required: true })} className="input w-full">
                                    <option value="">Select District</option>   
                                    {
                                        selectedDivision &&
                                        bangladesh[selectedDivision].map((dis) => (
                                        <option key={dis} value={dis}>{dis}</option>
                                        ))
                                    }
                                </select>
                                {errors.district?.type == "required" && <span className='flex items-start justify-start'><MdError></MdError> <p className="text-red-600">Please Enter Your District.</p></span>}
                        
                                <button className="btn btn-neutral mt-4">Be A Rider</button>
                            </fieldset>
                        </form>
                </div>
                <div className='w-full h-full flex items-center justify-center'>
                    <img src={Image} alt="Rider" className='h-full w-80'/>
                </div>
            </div>
        </div>
    );
};

export default BeARider;