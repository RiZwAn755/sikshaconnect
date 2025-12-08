import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !username || !email || !password) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await axios.post(`${baseUrl}/api/auth/signup`, {
                name,
                username,
                email,
                password,
            });

            if (res?.data) {
                alert("Registered successfully");
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            if (error?.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Registration failed");
            }
        }
    };

    return (
        <main className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full max-w-md px-6 py-8">
                <div className="bg-black text-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-red-500">Create account</h2>
                    <p className="text-sm text-white mt-2">Join SikshaConnect</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <input
                            className="w-full px-4 py-2 rounded-sm bg-white text-black placeholder-gray-500"
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            className="w-full px-4 py-2 rounded-sm bg-white text-black placeholder-gray-500"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            className="w-full px-4 py-2 rounded-sm bg-white text-black placeholder-gray-500"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            className="w-full px-4 py-2 rounded-sm bg-white text-black placeholder-gray-500"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="w-full py-2 bg-red-500 text-black font-semibold rounded-sm" type="submit">
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Register;