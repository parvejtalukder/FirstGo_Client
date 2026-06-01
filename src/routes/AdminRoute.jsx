import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loader from '../utility/Loader/Loader';
import { Navigate, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminRoute = ({children}) => {

    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();
    // const navigate = useNavigate();
    const location = useLocation();

    if (loading || roleLoading) {
        return <Loader></Loader>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role.role !== "admin") {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;