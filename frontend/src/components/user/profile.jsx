import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseurl = import.meta.env.VITE_BASE_URL;

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const username = localStorage.getItem("username");

    useEffect(() => {
        if (!username) {
            setLoading(false);
            return;
        }

        let mounted = true;
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${baseurl}/api/user/${username}`);
                if (mounted) setUser(res.data || res.data.user || null);
            } catch (err) {
                console.error("Failed to load user profile:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchUser();
        return () => {
            mounted = false;
        };
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center text-black">Loading profile...</div>
            </div>
        );
    }

    if (!username) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <p className="text-black">You are not signed in.</p>
                    <Link to="/login" className="mt-3 inline-block px-4 py-2 bg-red-500 text-black rounded-sm">Sign in</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white text-black">
            <section className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-black text-white rounded-lg p-6 sm:p-10">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-black text-xl font-semibold">
                            {user?.name ? user.name.charAt(0).toUpperCase() : (username ? username.charAt(0).toUpperCase() : "U")}
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold text-red-500">{user?.name || username}</h1>
                            <p className="mt-2 text-sm">@{user?.username || username}</p>
                            {user?.email && <p className="mt-1 text-sm">{user.email}</p>}

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link to="/profile/edit" className="px-4 py-2 bg-red-500 text-black rounded-sm">Edit Profile</Link>
                                <Link to="/friends" className="px-4 py-2 border border-white rounded-sm">Friends</Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-white">
                        <h2 className="text-lg font-semibold">About</h2>
                        <p className="mt-2 text-sm">{user?.bio || "No bio yet."}</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Profile;