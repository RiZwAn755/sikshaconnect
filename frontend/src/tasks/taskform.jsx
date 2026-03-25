
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PayButton from "../components/payments/paybutton";

const Taskform = () => {
    const navigate = useNavigate();
    const { friendshipId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [showPayment, setShowPayment] = useState(false);

    const isFormValid = () => {
        return title.trim() !== "" && duration > 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            // here you could send the task data to the server if needed
            setShowPayment(true);
        }
    };

    const amountValue = duration ? Number(duration) * 10 : 25; // simple calculation

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {friendshipId ? "Create a Task" : "New Task"}
            </h2>
            {!showPayment && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Duration (in hours) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isFormValid()}
                            className={`px-4 py-2 bg-black text-white rounded-lg text-sm font-medium transition 
                                ${isFormValid() ? "hover:bg-gray-800" : "opacity-50 cursor-not-allowed"}`}
                        >
                            Continue
                        </button>
                    </div>
                </form>
            )}

            {showPayment && (
                <div className="mt-6">
                    <PayButton amountvalue={amountValue} />
                </div>
            )}
        </div>
    );
};

export default Taskform;