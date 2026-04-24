import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../utils/loader";

const baseurl = import.meta.env.VITE_BASE_URL;
const userid = localStorage.getItem("userid");

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!userid) {
                    setUser(null);
                    setLoading(false);
                    return;
                }
                const res = await axios.get(`${baseurl}/api/user/me`, {
                    params: { userid },
                });
                setUser(res.data);
            } catch (err) {
                console.error("Failed to load profile:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${baseurl}/api/auth/logout`, {
                withCredentials: true,
            });
            if (res.status === 200) {
                localStorage.removeItem('userid');
                window.dispatchEvent(new Event("authStateChanged"));
                window.location.href = '/landing';
            }
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed");
        }
    };

    if (loading) return <Loader text="Fetching profile..." />;

    if (!userid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <p className="text-gray-900 font-medium mb-4">You are not signed in.</p>
                    <Link to="/login" className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm">
                        Sign in
                    </Link>
                </div>
            </div>
        );
    }

    const initial = user?.name ? user.name.charAt(0).toUpperCase() : (user?.username ? user.username.charAt(0).toUpperCase() : "U");

    return (
        <main className="min-h-[80vh] bg-slate-50 px-4 sm:px-6 py-12">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Profile Header Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-10 relative overflow-hidden">
                    {/* Cover Background (decorative) */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90"></div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 mt-12 sm:mt-16">
                        
                        {/* Avatar */}
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-blue-600 shadow-md border-4 border-white flex-shrink-0">
                            {initial}
                        </div>

                        {/* Info & Actions */}
                        <div className="flex-1 text-center sm:text-left w-full flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                                    {user?.name || user?.username}
                                </h1>
                                <p className="text-sm font-medium text-gray-500 mt-1">@{user?.username}</p>
                                {user?.email && <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>}
                            </div>

                            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4 sm:mt-0">
                                <Link to="/friends" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium transition shadow-sm">
                                    Connections ({user?.friends?.length ?? 0})
                                </Link>
                                <button onClick={handleLogout} className="px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-gray-300 hover:border-red-200 rounded-lg text-sm font-medium transition shadow-sm">
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Sections could go here */}

            </div>
        </main>
    );
};

export default Profile;