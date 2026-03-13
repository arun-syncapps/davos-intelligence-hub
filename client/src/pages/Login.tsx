import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginApi, register as registerApi } from '../api/api';
import SectionHeader from '../components/SectionHeader';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<'guest' | 'host'>('guest');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const data = await loginApi(email, password);
                login(data.token, data.user);
            } else {
                const data = await registerApi(name, email, password, role);
                login(data.token, data.user);
            }
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Authentication failed');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto mt-20 p-8 bg-white border border-wef-border shadow-2xl"
        >
            <SectionHeader
                title={isLogin ? "Sign In" : "Register"}
                subtitle="Davos Intelligence Hub"
            />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
                {!isLogin && (
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-wef-dark mb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full border-b border-wef-border py-2 focus:border-wef-blue outline-none transition-colors font-mono"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-wef-dark mb-2">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border-b border-wef-border py-2 focus:border-wef-blue outline-none transition-colors font-mono"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-wef-dark mb-2">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full border-b border-wef-border py-2 focus:border-wef-blue outline-none transition-colors font-mono"
                    />
                </div>

                {!isLogin && (
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-wef-dark mb-2">Account Type</label>
                        <select
                            value={role}
                            onChange={e => setRole(e.target.value as 'guest' | 'host')}
                            className="w-full border-b border-wef-border py-2 focus:border-wef-blue outline-none transition-colors font-mono bg-white"
                        >
                            <option value="guest">Guest Attendee</option>
                            <option value="host">Event Host</option>
                        </select>
                    </div>
                )}

                {error && <p className="text-red-500 font-mono text-sm">{error}</p>}

                <button
                    type="submit"
                    className="mt-4 bg-wef-dark hover:bg-wef-blue text-white py-4 font-bold uppercase tracking-widest text-xs transition-colors"
                >
                    {isLogin ? 'Enter Hub' : 'Create Account'}
                </button>
            </form>

            <div className="mt-8 text-center">
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[10px] font-bold uppercase tracking-widest text-wef-blue hover:text-wef-dark transition-colors"
                >
                    {isLogin ? 'Need an account? Register' : 'Already registered? Sign in'}
                </button>
            </div>
        </motion.div>
    );
};

export default Login;
