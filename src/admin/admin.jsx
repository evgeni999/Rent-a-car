import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const Admin = () => {
    const [stats, setStats] = useState({
        totalVehicles: 0,
        totalRentals: 0,
        totalUsers: 0,
        totalMessages: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch vehicles count
                const vehiclesSnapshot = await getDocs(collection(db, "vehicles"));
                const vehiclesCount = vehiclesSnapshot.size;

                // Fetch rentals count
                const rentalsSnapshot = await getDocs(collection(db, "rentals"));
                const rentalsCount = rentalsSnapshot.size;

                // Fetch users count
                const usersSnapshot = await getDocs(collection(db, "users"));
                const usersCount = usersSnapshot.size;

                // Fetch messages count
                const messagesSnapshot = await getDocs(collection(db, "contactForm"));
                const messagesCount = messagesSnapshot.size;

                setStats({
                    totalVehicles: vehiclesCount,
                    totalRentals: rentalsCount,
                    totalUsers: usersCount,
                    totalMessages: messagesCount
                });

                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Админ Панел</h1>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Общо Превозни Средства</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalVehicles}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Общо Резервации</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.totalRentals}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Общо Потребители</h3>
                    <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Общо Съобщения</h3>
                    <p className="text-3xl font-bold text-red-600">{stats.totalMessages}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Бързи Действия</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/admin/vehicles" className="bg-blue-500 text-white p-3 rounded-lg text-center hover:bg-blue-600 transition">
                            Управление на Превозни Средства
                        </Link>
                        <Link to="/admin/rentals" className="bg-green-500 text-white p-3 rounded-lg text-center hover:bg-green-600 transition">
                            Управление на Резервации
                        </Link>
                        <Link to="/admin/users" className="bg-purple-500 text-white p-3 rounded-lg text-center hover:bg-purple-600 transition">
                            Управление на Потребители
                        </Link>
                        <Link to="/admin/contact-form-manager" className="bg-red-500 text-white p-3 rounded-lg text-center hover:bg-red-600 transition">
                            Управление на Съобщения
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin; 