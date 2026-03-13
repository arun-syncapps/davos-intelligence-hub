import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { registerForEvent } from '../api/api';
import { useAuth } from '../context/AuthContext';

const RegistrationModal = ({ eventId, onClose }: { eventId: string, onClose: () => void }) => {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await registerForEvent({ event_id: eventId, user_name: name, user_email: email });
            setMessage('Registration requested. Host approval pending.');
            setTimeout(onClose, 3000);
        } catch (err: any) {
            if (err.response?.data?.error) {
                setMessage(err.response.data.error);
            } else {
                setMessage('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 50, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="bg-white p-8 max-w-md w-full relative border-t-4 border-wef-blue shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-wef-dark transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <h3 className="text-3xl font-bold mb-2">Register</h3>
                    <p className="text-sm text-gray-500 font-mono mb-8 uppercase tracking-widest text-[10px]">Secure Your Spot</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-wef-dark mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                disabled={!!user}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full border-b border-wef-border py-2 focus:border-wef-blue outline-none transition-colors font-mono disabled:text-gray-400 disabled:bg-transparent"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-wef-dark mb-2">Professional Email</label>
                            <input
                                type="email"
                                required
                                disabled={!!user}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full border-b border-wef-border py-2 focus:border-wef-blue outline-none transition-colors font-mono disabled:text-gray-400 disabled:bg-transparent"
                                placeholder="john@organization.org"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-wef-dark hover:bg-wef-blue text-white py-4 font-bold uppercase tracking-widest text-xs transition-colors duration-300 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Request Attendance'}
                        </button>

                        {message && (
                            <p className={`text-sm text-center font-mono mt-4 ${message.includes('requested') ? 'text-green-600' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default RegistrationModal;
