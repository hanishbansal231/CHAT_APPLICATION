import { RootState } from '../../redux/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectRoute:React.FC = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    console.log(token);
    return token
        ? (<Outlet />)
        : (<Navigate to="/login" />)
}

export default ProtectRoute