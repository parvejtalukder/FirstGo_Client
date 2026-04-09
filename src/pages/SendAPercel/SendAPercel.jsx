import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendAPercel = () => {

    const { register, handleSubmit, control, 
      // formState: { errors } 
    } = useForm();

    const { user } = useAuth();
    const axios = useAxiosSecure();

    const serviceCenter = useLoaderData();
    const dataRegions = serviceCenter.map((center) => center.region);
    const Regions = [...new Set(dataRegions)];
    const senderRegion = useWatch({ control, name: "senderRegion"});
    const receiverRegion = useWatch({ control, name: "receiverRegion"});

    const districtsByRegion = (region) => {
      const regionDistricts = serviceCenter.filter((center) => center.region === region);
      const districts = regionDistricts.map((regionBase) => regionBase.district);
      return districts;
    }
    
    const handleSendPercel = (data) => {
        const isDocument = data.parcelType === "document";
        const sameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);
        
        let cost = 0;
        if (isDocument) {
            cost = sameDistrict ? 60 : 80;
        } else {
            if (parcelWeight < 3) {
                cost = sameDistrict ? 110 : 150;
            } else {
                const minCharge = sameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = sameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                
                cost = minCharge + extraCharge;
            }
        }

        data.cost = cost;

        Swal.fire({
          title: "Do you agree with our cost?",
          text: "Your Charge is " + cost + " BDT",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, I Do!"
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              axios.post("/parcels", data)
              .then(res => {
                console.log(res.data);
              })
            } catch (error) {
              console.log(error);
            }
          }
        });
        // console.log(cost);
    }

    return (
        <div className='my-8 py-20 px-28 bg-white rounded-4xl'>
            <h2 className='text-4xl font-bold '>Send A Percel</h2>  
            <h5 className='text-2xl font-bold'>Enter your parcel details</h5>    
            <form onSubmit={handleSubmit(handleSendPercel)} className='mt-12  space-y-4 text-black'>
                {/* percel type  */}
                <div className='flex gap-4'>
                    <label className='label'> 
                        <input type="radio" {
                            ...register('parcelType')
                        } value={"document"} className="radio" defaultChecked />
                    Document </label>
                    <label className='label'> 
                        <input type="radio" {
                            ...register('parcelType')
                        } value={"non-document"} className="radio"  />
                    Non-Document </label>
                </div>
                {/* pecel base info  */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    <fieldset className="fieldset">
                      <label className="label text-black">Percel Name</label>
                      <input type="text" className="input w-full text-black" placeholder="Percel Name" {
                        ...register('parcelName')
                      } />
                    </fieldset>
                    <fieldset className="fieldset">
                      <label className="label text-black">Percel Weight (KG)</label>
                      <input type="number" className="input text-black w-full" placeholder="Percel Weight" {
                        ...register('parcelWeight')
                      } />
                      {/* {errors.em} */}
                      {/* console.log(errors); */}
                    </fieldset>
                    {/* {errors.} */}
                </div>
                {/* s - r  */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 text-black'>
                    {/* s  */}
                    <div className='flex-1'>
                            <fieldset className="fieldset">
                                <label className="label text-black">Sender Name</label>
                                <input type="text" defaultValue={user?.displayName} className="text-black input w-full" placeholder="Sender Name" {
                                ...register('senderName')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label text-black">Sender Email</label>
                                <input type="email" defaultValue={user?.email} className="text-black input w-full" placeholder="Sender Email" {
                                ...register('senderEmail')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label text-black">Sender Address</label>
                                <input type="text" className="input w-full text-black" placeholder="Sender Address" {
                                ...register('senderAddress')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label text-black">Sender Phone</label>
                                <input type="number" className="text-black input w-full" placeholder="Sender Phone" {
                                ...register('senderPhone')
                              } />
                            </fieldset>
                            {/* Sndr Region  */}
                            <fieldset className="fieldset">
                              <legend className="fieldset-legend">Sender Region</legend>
                              <select {...register("senderRegion")} defaultValue="Select Region" className="text-black/50 select w-full gap-3">
                                <option className='input' disabled={true}>Select Region</option>
                                {
                                  Regions.map((region, i) => (
                                    <option key={i} value={region} className='mt-2 mr-2 input'>{region}</option>
                                  ))
                                }
                              </select>
                              {/* <span className="label">Optional</span> */}
                            </fieldset>
                            <fieldset className="fieldset">
                              <legend className="fieldset-legend">Select District</legend>
                              <select {...register("senderDistrict")} defaultValue="Select District" className="text-black/50 select w-full gap-3">
                                <option className='input ' disabled={true}>Select District</option>
                                {
                                  districtsByRegion(senderRegion).map((region, i) => (
                                    <option key={i} value={region} className='mt-2 mr-2 w-full input'>{region}</option>
                                  ))
                                }
                              </select>
                              {/* <span className="label">Optional</span> */}
                            </fieldset>
                            {/* <fieldset className="fieldset">
                                <label className="label text-black">Sender District</label>
                                <input type="text" className="text-black input w-full" placeholder="Sender District" {
                                ...register('senderDistrict')
                              } />
                            </fieldset> */}
                    </div>
                    {/* r  */}
                    <div className='flex-1'>
                            <fieldset className="fieldset">
                                <label className="label text-black">Receiver Name</label>
                                <input type="text" className="text-black input w-full" placeholder="Receiver Name" {
                                ...register('receiverName')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label text-black">Receiver Email</label>
                                <input type="email" className="input w-full text-black" placeholder="Receiver Email" {
                                ...register('receiverEmail')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label text-black">Receiver Address</label>
                                <input type="text" className="input w-full text-black" placeholder="Receiver Address" {
                                ...register('receiverAddress')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label text-black">Receiver Phone</label>
                                <input type="number" className=" text-black input w-full" placeholder="Receiver Phone" {
                                ...register('receiverPhone')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                              <legend className="fieldset-legend">Receiver Region</legend>
                              <select {...register("receiverRegion")} defaultValue="Select Region" className="text-black/50 select w-full gap-3">
                                <option className='input' disabled={true}>Select Region</option>
                                {
                                  Regions.map((region, i) => (
                                    <option key={i} value={region} className='mt-2 mr-2 input'>{region}</option>
                                  ))
                                }
                              </select>
                              {/* <span className="label">Optional</span> */}
                            </fieldset>
                            <fieldset className="fieldset">
                              <legend className="fieldset-legend">Receiver District</legend>
                              <select {...register("receiverDistrict")} defaultValue="Select District" className="text-black/50 select w-full gap-3">
                                <option className='input ' disabled={true}>Select District</option>
                                {
                                  districtsByRegion(receiverRegion).map((region, i) => (
                                    <option key={i} value={region} className='mt-2 mr-2 w-full input'>{region}</option>
                                  ))
                                }
                              </select>
                              {/* <span className="label">Optional</span> */}
                            </fieldset>
                    </div>
                </div>
                <input type="submit" value="Send Percel" className='btn btn-primary w-full text-black' />
            </form>     
        </div>
    );
};

export default SendAPercel;