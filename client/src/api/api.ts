import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const login = (email: string, password: string) =>
    api.post('/auth/login', { email, password }).then(res => res.data);

export const register = (name: string, email: string, password: string, role: string) =>
    api.post('/auth/register', { name, email, password, role }).then(res => res.data);

// Public Data
export const getEvents = (date?: string, category?: string) =>
    api.get('/events', { params: { date, category } }).then(res => res.data);

export const getEventById = (id: string) =>
    api.get(`/events/${id}`).then(res => res.data);

export const getSpeakers = () =>
    api.get('/speakers').then(res => res.data);

export const getSpeakerById = (id: string) =>
    api.get(`/speakers/${id}`).then(res => res.data);

export const getOrganizations = () =>
    api.get('/organizations').then(res => res.data);

export const getOrganizationById = (id: string) =>
    api.get(`/organizations/${id}`).then(res => res.data);

export const getVenues = () =>
    api.get('/venues').then(res => res.data);

export const getVenueById = (id: string) =>
    api.get(`/venues/${id}`).then(res => res.data);

// Registrations (now connects to authenticated user if available)
export const registerForEvent = (data: { event_id: string; user_name: string; user_email: string }) =>
    api.post('/register', data).then(res => res.data);

// Host Routes
export const getHostEvents = () =>
    api.get('/host/events').then(res => res.data);

export const createHostEvent = (data: any) =>
    api.post('/host/events', data).then(res => res.data);

export const getEventAttendees = (eventId: string) =>
    api.get(`/host/events/${eventId}/attendees`).then(res => res.data);

export const updateAttendeeStatus = (eventId: string, id: string, status: string) =>
    api.post(`/host/events/${eventId}/attendees/${id}/status`, { status }).then(res => res.data);

export const deleteHostEvent = (id: string) =>
    api.delete(`/host/events/${id}`).then(res => res.data);

export const updateHostEvent = (id: string, data: any) =>
    api.put(`/host/events/${id}`, data).then(res => res.data);

// Admin Routes
export const getAdminStats = () =>
    api.get('/admin/stats').then(res => res.data);

export const getAdminUsers = () =>
    api.get('/admin/users').then(res => res.data);

export const updateUserRole = (id: string, role: string) =>
    api.put(`/admin/users/${id}/role`, { role }).then(res => res.data);

export const updateAdminUser = (id: string, name: string, email: string) =>
    api.put(`/admin/users/${id}`, { name, email }).then(res => res.data);

export const deleteAdminUser = (id: string) =>
    api.delete(`/admin/users/${id}`).then(res => res.data);

export const getAdminEvents = () =>
    api.get('/admin/events').then(res => res.data);

export const deleteEvent = (id: string) =>
    api.delete(`/admin/events/${id}`).then(res => res.data);

// User Profile
export const getUserRegistrations = () =>
    api.get('/user/registrations').then(res => res.data);

export const getUserProfile = () =>
    api.get('/user/profile').then(res => res.data);

export const updateUserProfile = (data: any) =>
    api.put('/user/profile', data).then(res => res.data);

// Network / Community
export const getMembers = (query?: string) =>
    api.get('/network/members', { params: { q: query } }).then(res => res.data);

export const getMemberProfile = (id: string) =>
    api.get(`/network/members/${id}`).then(res => res.data);

export const connectWithUser = (id: string) =>
    api.post(`/network/connect/${id}`).then(res => res.data);

export const getFeed = () =>
    api.get('/network/feed').then(res => res.data);

export const createPost = (content: string, image_url?: string) =>
    api.post('/network/posts', { content, image_url }).then(res => res.data);

export const likePost = (id: string) =>
    api.post(`/network/posts/${id}/like`).then(res => res.data);
