import React, { useState } from 'react';
import UserNavbar from "../../components/user/userNavbar";
import Hero from "../../components/user/hero";
import Features from "../../components/user/features";
import SeminarsList from "../../components/user/seminarsList";
import Testimonials from "../../components/user/testimonials";
import Footer from "../../components/user/footer";

const PRIMARY_COLOR = 'blue-500';
const PRIMARY_COLOR_DARK = 'blue-600';
const PRIMARY_COLOR_HOVER = 'blue-400';

const UserDashboard = () => {
    return (
        <div className="min-h-screen antialiased font-sans">
            <UserNavbar primary_dark={ PRIMARY_COLOR_DARK } color_hover={ PRIMARY_COLOR_HOVER }/>
            <Hero primary_color={ PRIMARY_COLOR } primary_dark={ PRIMARY_COLOR_DARK } color_hover={ PRIMARY_COLOR_HOVER }/>
            <Features />
            <SeminarsList primary_color={ PRIMARY_COLOR } primary_dark={ PRIMARY_COLOR_DARK } /> 
            <Testimonials primary_color={ PRIMARY_COLOR } primary_dark={ PRIMARY_COLOR_DARK } /> 
            <Footer color_hover={ PRIMARY_COLOR_HOVER }/>
        </div>
    );
};

export default UserDashboard;