import React from 'react';
import { useForm } from 'react-hook-form';

const SendAPercel = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const handleSendPercel = (data) => {
        console.log(data);
    }

    return (
        <div className='my-8 py-20 px-28 bg-white rounded-4xl'>
            <h2 className='text-4xl font-bold '>Send A Percel</h2>  
            <h5 className='text-2xl font-bold'>Enter your parcel details</h5>    
            <form onSubmit={handleSubmit(handleSendPercel)} className='mt-12 space-y-4 text-black'>
                {/* percel type  */}
                <div className='flex gap-4'>
                    <label className='label'> 
                        <input type="radio" {
                            ...register('percelType')
                        } value={"document"} className="radio" defaultChecked />
                    Document </label>
                    <label className='label'> 
                        <input type="radio" {
                            ...register('percelType')
                        } value={"non-document"} className="radio"  />
                    Non-Document </label>
                </div>
                {/* pecel base info  */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    <fieldset className="fieldset">
                      <label className="label">Percel Name</label>
                      <input type="text" className="input w-full" placeholder="Percel Name" {
                        ...register('percelName')
                      } />
                    </fieldset>
                    <fieldset className="fieldset">
                      <label className="label">Percel Weight (KG)</label>
                      <input type="number" className="input w-full" placeholder="Percel Weight" {
                        ...register('percelWeight')
                      } />
                    </fieldset>
                </div>
                {/* s - r  */}
                <div>
                    {/* s  */}
                    <div>
                            <fieldset className="fieldset">
                                <label className="label">Sender Name</label>
                                <input type="text" className="input w-full" placeholder="Sender Name" {
                                ...register('senderName')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label">Sender Address</label>
                                <input type="text" className="input w-full" placeholder="Sender Address" {
                                ...register('senderAddress')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label">Sender Phone</label>
                                <input type="number" className="input w-full" placeholder="Sender Phone" {
                                ...register('senderPhone')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label">Sender District</label>
                                <input type="text" className="input w-full" placeholder="Sender Districtress" {
                                ...register('senderDistrict')
                              } />
                            </fieldset>
                    </div>
                    {/* r  */}
                    <div>
                            <fieldset className="fieldset">
                                <label className="label">Receiver Name</label>
                                <input type="text" className="input w-full" placeholder="Receiver Name" {
                                ...register('receiverName')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label">Receiver Address</label>
                                <input type="text" className="input w-full" placeholder="Receiver Address" {
                                ...register('receiverAddress')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label">Receiver Phone</label>
                                <input type="number" className="input w-full" placeholder="Receiver Phone" {
                                ...register('receiverPhone')
                              } />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label">Receiver District</label>
                                <input type="text" className="input w-full" placeholder="Receiver Districtress" {
                                ...register('receiverDistrict')
                              } />
                            </fieldset>
                    </div>
                </div>
                <input type="submit" value="Send Percel" className='btn btn-primary w-full text-black' />
            </form>     
        </div>
    );
};

export default SendAPercel;