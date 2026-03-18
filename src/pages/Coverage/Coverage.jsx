import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6876, 90.3510];
    const serviceCenters = useLoaderData();
    console.log(serviceCenters);
    return (
        <div className='py-10'>
            <h2 className="text-5xl">We are in 64 Districts.</h2>
            <div>

            </div>
            <div className='border-2 h-[400px]'>
                <MapContainer className='h-full rounded-xl py-5' center={position} zoom={7} scrollWheelZoom={false}>
                    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
            {
                serviceCenters.map(one => <Marker key={one.id} position={[one.latitude, one.longitude]}>
                    <Popup><p className='font-bold text-xl'>{one.district}</p>
                    <p className=''><span className='font-bold'>We are in : </span>{one.covered_area.join(", ")}</p></Popup>
                </Marker>)
            }
            {/* <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;