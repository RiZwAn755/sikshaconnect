import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logout from "../auth/logout";
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


    if (loading) {
        return <Loader text="Fetching data" />;
    }

    if (!userid) {
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

                            <div className="mt-3 flex flex-wrap gap-3">
                                <Logout />
                                <Link to="/profile/edit" className="px-4 py-2 border border-white rounded-sm">Edit Profile</Link>
                                <Link to="/friends" className="px-4 py-2 border border-white rounded-sm">Friends: {user?.friends?.length ?? 0}</Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-white">


                    </div>
                </div>
            </section>
        </main>
    );
};

export default Profile;