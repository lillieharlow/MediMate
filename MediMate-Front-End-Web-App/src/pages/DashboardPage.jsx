/*
 * DashboardPage.jsx
 *
 * Main dashboard page that displays different dashboard cards based on user type:
 * - Patients: "Our Doctors" and "My Bookings"
 * - Staff: "Patient Manager" and "Doctor Manager"
 * - Doctors: "Current Booking" and "Today's Bookings"
 *
 * Handles data fetching and refresh logic for doctors and bookings.
 */

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

import { getBookingById, getDoctorBookings, getPatientBookings } from '../api/booking.js';
import { getAllDoctors } from '../api/doctor.js';

import DashboardCard from '../components/dashboard/DashboardCard.jsx';
import CurrentBookingCard from '../components/dashboard/DoctorCurrentBookingCard.jsx';
import DoctorManagerCard from '../components/dashboard/DoctorManagerCard.jsx';
import TodaysBookingsCard from '../components/dashboard/DoctorTodaysBookingsCard.jsx';
import PatientMyBookingsCard from '../components/dashboard/PatientMyBookingsCard.jsx';
import PatientOurDoctorsCardList from '../components/dashboard/PatientOurDoctorsCardList.jsx';
import StaffPatientManager from '../components/dashboard/StaffPatientManager.jsx';

import { useAuth } from '../contexts/AuthContext';
import { DashboardCardRow } from '../style/componentStyles';
import { isToday } from '../utils/patientUtils';

export default function DashboardPage() {
  const { userId, userType, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorBookings, setDoctorBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [staffSelectedDoctor, setStaffSelectedDoctor] = useState('');
  const [staffDoctorBookings, setStaffDoctorBookings] = useState([]);

  useEffect(() => {
    if (userType === 'patient') {
      async function fetchData() {
        try {
          const [doctorsData, bookingsData] = await Promise.all([
            getAllDoctors(),
            getPatientBookings(userId),
          ]);
          setDoctors(doctorsData);
          setBookings(bookingsData);
        } catch {}
      }
      fetchData();
    } else if (userType === 'staff') {
      getAllDoctors().then(setDoctors);
    }
  }, [userType, userId]);

  useEffect(() => {
    if (userType === 'doctor') {
      async function fetchDoctorBookings() {
        const bookingsData = await getDoctorBookings(userId);
        setDoctorBookings(bookingsData);
        if (bookingsData && bookingsData.length > 0) {
          setSelectedBooking(bookingsData[0]);
        } else {
          setSelectedBooking(null);
        }
      }
      fetchDoctorBookings();
    }
  }, [userType, userId]);

  useEffect(() => {
    if (userType === 'staff' && staffSelectedDoctor) {
      async function fetchStaffDoctorBookings() {
        const bookingsData = await getDoctorBookings(staffSelectedDoctor);
        setStaffDoctorBookings(bookingsData || []);
      }
      fetchStaffDoctorBookings();
    } else if (userType === 'staff') {
      setStaffDoctorBookings([]);
    }
  }, [userType, staffSelectedDoctor]);

  // Helper function to get dashboard heading based on user type
  function getDashboardHeading(type) {
    if (type === 'patient') return 'Patient Dashboard';
    if (type === 'staff') return 'Staff Dashboard';
    if (type === 'doctor') return 'Doctor Dashboard';
    return 'Dashboard';
  }

  // Handler to refresh bookings after a new booking is created
  async function handleBookingCreated(createdDoctorId) {
    if (userType === 'patient') {
      const bookingsData = await getPatientBookings(userId);
      setBookings(bookingsData);
    } else if (userType === 'doctor') {
      const bookingsData = await getDoctorBookings(userId);
      setDoctorBookings(bookingsData);
      if (bookingsData && bookingsData.length > 0) {
        setSelectedBooking(bookingsData[0]);
      } else {
        setSelectedBooking(null);
      }
    } else if (userType === 'staff' && (createdDoctorId || staffSelectedDoctor)) {
      // Refetch bookings for the relevant doctor after staff creates a booking
      const doctorId = createdDoctorId || staffSelectedDoctor;
      if (doctorId) {
        setStaffSelectedDoctor(doctorId);
        const bookingsData = await getDoctorBookings(doctorId);
        setStaffDoctorBookings(bookingsData || []);
      }
    }
  }

  return !isAuthenticated ? (
    <Navigate to="/login" replace />
  ) : (
    <main>
      <h1 data-testid="app-dashboard-heading">{getDashboardHeading(userType)}</h1>
      {userType === 'patient' && (
        <DashboardCardRow>
          <DashboardCard title="Our Doctors">
            <PatientOurDoctorsCardList
              doctors={doctors}
              patientId={userId}
              bookings={bookings}
              onBookingCreated={handleBookingCreated}
            />
          </DashboardCard>
          <DashboardCard title="My Bookings">
            <PatientMyBookingsCard
              bookings={bookings}
              doctors={doctors}
              onBookingsRefresh={handleBookingCreated}
            />
          </DashboardCard>
        </DashboardCardRow>
      )}
      {userType === 'staff' && (
        <DashboardCardRow>
          <DashboardCard title="Patient Manager">
            <StaffPatientManager
              onBookingCreated={handleBookingCreated}
              staffSelectedDoctor={staffSelectedDoctor}
              doctors={doctors}
            />
          </DashboardCard>
          <DashboardCard title="Doctor Manager">
            <DoctorManagerCard
              selectedDoctor={staffSelectedDoctor}
              setSelectedDoctor={setStaffSelectedDoctor}
              doctorBookings={staffDoctorBookings}
              onBookingCreated={handleBookingCreated}
              disablePointer={true}
            />
          </DashboardCard>
        </DashboardCardRow>
      )}
      {userType === 'doctor' && (
        <DashboardCardRow>
          <DashboardCard title="Current Booking">
            <CurrentBookingCard booking={selectedBooking} />
          </DashboardCard>
          {(() => {
            return null;
          })()}
          <TodaysBookingsCard
            doctorBookings={doctorBookings.filter(b => isToday(b.datetimeStart))}
            containerClassName="doctor-manager-bookings"
            disablePointer={false}
            onBookingCreated={handleBookingCreated}
            onBookingSelect={async booking => {
              if (booking?._id) {
                setSelectedBooking(await getBookingById(booking._id));
              } else {
                setSelectedBooking(booking);
              }
            }}
            selectedBooking={selectedBooking}
          />
        </DashboardCardRow>
      )}
    </main>
  );
}
