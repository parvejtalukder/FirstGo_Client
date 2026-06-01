import React from 'react';
import useRole from '../../../hooks/useRole';
import Loader from '../../../utility/Loader/Loader';
import Admin from './Admin/Admin';
import Rider from './Admin/Rider';
import User from './Admin/User';

const Index = () => {

    const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <Loader></Loader>
    }

    if (role.role === 'admin') {
        return <Admin></Admin>
    } 

    if (role.role === 'rider') {
        return <Rider></Rider>
    } 

    if (role.role === 'user') {
        return <User></User>
    } 

};

export default Index;