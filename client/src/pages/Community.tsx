import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMembers, getFeed, createPost, connectWithUser, likePost } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Search, UserPlus, Heart, MessageSquare, Briefcase, User, Users as UsersIcon, Calendar, CheckCircle } from 'lucide-react';

const Community = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [members, setMembers] = useState<any[]>([]);
    const [feed, setFeed] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [activeTab, setActiveTab] = useState<'feed' | 'directory'>('directory');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        loadData();
    }, [user, navigate]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [membersData, feedData] = await Promise.all([
                getMembers(searchQuery),
                getFeed()
            ]);
            setMembers(membersData.filter((m: any) => m.id !== user?.id));
            setFeed(feedData);
        } catch (err) {
            console.error('Failed to load community data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await getMembers(searchQuery);
        setMembers(data.filter((m: any) => m.id !== user?.id));
    };

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;
        await createPost(newPostContent);
        setNewPostContent('');
        loadData();
    };

    const handleLike = async (postId: string) => {
        const res = await likePost(postId);
        setFeed(feed.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    user_liked: res.liked,
                    likes_count: res.liked ? post.likes_count + 1 : Math.max(0, post.likes_count - 1)
                };
            }
            return post;
        }));
    };

    const [connectedUsers, setConnectedUsers] = useState<Set<string>>(new Set());

    const handleConnect = async (userId: string) => {
        try {
            await connectWithUser(userId);
            setConnectedUsers(prev => new Set(prev).add(userId));
        } catch (err) {
            alert('Failed to send connection request or request already exists.');
        }
    };

    if (!user || loading) return (
        <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wef-blue"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Sidebar - Manage my network */}
                <div className="hidden lg:block lg:col-span-3 space-y-4">
                    <div className="bg-white rounded-sm border border-wef-border overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-wef-border">
                            <h2 className="text-[16px] font-semibold text-wef-dark">Manage my network</h2>
                        </div>
                        <ul className="py-2 text-[16px] text-gray-500 font-medium">
                            <li className="px-4 py-3 hover:bg-wef-gray cursor-pointer flex justify-between items-center transition-colors">
                                <span className="flex items-center gap-3"><UsersIcon size={20}/> Connections</span>
                                <span className="font-normal">{Math.floor(Math.random() * 500) + 120}</span>
                            </li>
                            <li className="px-4 py-3 hover:bg-wef-gray cursor-pointer flex justify-between items-center transition-colors">
                                <span className="flex items-center gap-3"><User size={20}/> Following & followers</span>
                            </li>
                            <li className="px-4 py-3 hover:bg-wef-gray cursor-pointer flex justify-between items-center transition-colors">
                                <span className="flex items-center gap-3"><Calendar size={20}/> Events</span>
                            </li>
                            <li className="px-4 py-3 hover:bg-wef-gray cursor-pointer flex justify-between items-center transition-colors">
                                <span className="flex items-center gap-3"><Briefcase size={20}/> Pages</span>
                                <span className="font-normal">{Math.floor(Math.random() * 20) + 5}</span>
                            </li>
                        </ul>
                    </div>

                    {/* View options widget */}
                    <div className="bg-white rounded-sm border border-wef-border overflow-hidden shadow-sm p-4">
                        <div className="flex items-center gap-4 border-b border-wef-border pb-4 cursor-pointer hover:bg-wef-gray -my-4 -mx-4 p-4 transition-colors">
                            <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-yellow-100 to-yellow-300"></div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Access exclusive networking</p>
                                <p className="text-sm font-semibold text-wef-dark hover:text-wef-blue">Try Premium for free</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9 space-y-4">
                    
                    {/* Tab Navigation */}
                    <div className="bg-white rounded-sm border border-wef-border overflow-hidden shadow-sm">
                        <div className="flex border-b border-wef-border">
                            <button
                                onClick={() => setActiveTab('directory')}
                                className={`flex-grow py-3 text-sm font-semibold transition-all relative ${activeTab === 'directory' ? 'text-wef-blue' : 'text-gray-500 hover:text-wef-dark hover:bg-wef-gray'}`}
                            >
                                Member Directory (Network)
                                {activeTab === 'directory' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wef-blue"></div>}
                            </button>
                            <button
                                onClick={() => setActiveTab('feed')}
                                className={`flex-grow py-3 text-sm font-semibold transition-all relative ${activeTab === 'feed' ? 'text-wef-blue' : 'text-gray-500 hover:text-wef-dark hover:bg-wef-gray'}`}
                            >
                                Community Feed
                                {activeTab === 'feed' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wef-blue"></div>}
                            </button>
                        </div>
                    </div>

                    {activeTab === 'directory' ? (
                        <>
                            {/* Outstanding Invitations Mimic */}
                            <div className="bg-white rounded-sm border border-wef-border shadow-sm p-4 flex justify-between items-center">
                                <span className="font-semibold text-wef-dark text-sm sm:text-[16px]">No pending invitations</span>
                                <span className="text-sm font-semibold text-gray-500 hover:bg-wef-gray px-3 py-1 cursor-pointer rounded transition-colors">Manage</span>
                            </div>

                            {/* People You May Know / Directory */}
                            <div className="bg-white rounded-sm border border-wef-border shadow-sm p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-[16px] text-wef-dark">People you may know at Davos</h3>
                                    
                                    <form onSubmit={handleSearch} className="relative w-48 sm:w-64">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                                        <input
                                            type="text"
                                            placeholder="Search directory..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-8 pr-3 py-1.5 border border-wef-border bg-wef-gray rounded text-sm focus:outline-none focus:ring-1 focus:ring-wef-blue transition-all"
                                        />
                                        <button type="submit" hidden>Search</button>
                                    </form>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {members.length === 0 ? (
                                        <div className="col-span-full text-center py-10 text-gray-500 text-sm">
                                            No members found. Try refining your search.
                                        </div>
                                    ) : (
                                        members.map(member => (
                                            <div key={member.id} className="border border-wef-border rounded-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow relative">
                                                <button className="absolute top-2 right-2 flex items-center justify-center p-1 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors">
                                                    <span className="sr-only">Dismiss</span>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.3 4.3l-3.3 3.3-3.3-3.3-.7.7 3.3 3.3-3.3 3.3.7.7 3.3-3.3 3.3 3.3.7-.7-3.3-3.3 3.3-3.3z"></path></svg>
                                                </button>
                                                
                                                <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 relative">
                                                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full border-4 border-white overflow-hidden bg-white">
                                                        {member.avatar_url ? (
                                                            <img src={member.avatar_url} alt={member.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-wef-gray flex items-center justify-center text-4xl text-gray-400 font-bold">
                                                                {member.name.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="pt-12 px-4 pb-4 flex flex-col flex-grow text-center">
                                                    <Link to={`/community/${member.id}`} className="font-semibold text-wef-dark hover:underline text-[16px] leading-tight mt-2">
                                                        {member.name}
                                                    </Link>
                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 h-8">
                                                        {member.headline || 'Annual Meeting Participant'}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 mt-2 line-clamp-1 h-3 flex items-center justify-center gap-1">
                                                        {Math.floor(Math.random() * 50) + 1} mutual connections
                                                    </p>
                                                    
                                                    <div className="mt-4 mt-auto w-full">
                                                        {connectedUsers.has(member.id) ? (
                                                            <button 
                                                                disabled
                                                                className="w-full flex items-center justify-center gap-1 py-1 px-3 rounded-full font-semibold border border-green-700 text-green-700 bg-white opacity-80"
                                                            >
                                                                <CheckCircle size={16} /> Pending
                                                            </button>
                                                        ) : (
                                                            <button 
                                                                onClick={() => handleConnect(member.id)}
                                                                className="w-full flex items-center justify-center gap-1 py-1 px-3 rounded-full font-semibold border border-wef-blue text-wef-blue hover:bg-blue-50 hover:border-blue-800 hover:text-blue-800 transition-colors"
                                                            >
                                                                <UserPlus size={16} /> Connect
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Feed Center Column */}
                            <div className="lg:col-span-3 space-y-4">
                                {/* Create Post */}
                                <div className="bg-white border border-wef-border shadow-sm rounded-sm p-4">
                                    <form onSubmit={handlePostSubmit} className="flex flex-col">
                                        <div className="flex gap-3 items-center w-full">
                                            <div className="w-12 h-12 rounded-full border border-wef-border overflow-hidden bg-wef-gray flex-shrink-0 flex items-center justify-center">
                                                <span className="font-bold text-gray-500 text-lg">{user?.name?.charAt(0)}</span>
                                            </div>
                                            <input
                                                value={newPostContent}
                                                onChange={e => setNewPostContent(e.target.value)}
                                                placeholder="Start a post..."
                                                className="flex-grow border border-gray-400 hover:bg-wef-gray rounded-full px-5 py-3 text-sm outline-none focus:ring-1 focus:ring-gray-500 transition-all font-medium text-gray-600 cursor-text"
                                            />
                                        </div>
                                        {newPostContent.trim() && (
                                            <div className="flex justify-end mt-4">
                                                <button type="submit" className="bg-wef-blue text-white px-5 py-1.5 rounded-full font-semibold hover:bg-blue-800 transition-colors text-sm">
                                                    Post
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>

                                {/* Feed Items */}
                                {feed.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 bg-white rounded-sm border border-wef-border shadow-sm text-sm">
                                        No posts yet. Be the first to start the conversation!
                                    </div>
                                ) : (
                                    feed.map((post: any) => (
                                        <div key={post.id} className="bg-white border border-wef-border shadow-sm rounded-sm mb-4 overflow-hidden">
                                            <div className="p-4 flex gap-3 items-start relative border-b border-transparent">
                                                <div className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer font-bold pb-2 px-1">...</div>
                                                <Link to={`/community/${post.author_id}`} className="shrink-0 group">
                                                    {post.author_avatar_url ? (
                                                        <img src={post.author_avatar_url} alt={post.author_name} className="w-12 h-12 rounded-full object-cover group-hover:opacity-90 transition-opacity" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold group-hover:opacity-90 transition-opacity">
                                                            {post.author_name?.charAt(0)}
                                                        </div>
                                                    )}
                                                </Link>
                                                <div className="flex flex-col -mt-1">
                                                    <Link to={`/community/${post.author_id}`} className="font-semibold text-wef-dark hover:underline hover:text-wef-blue text-sm transition-colors block">
                                                        {post.author_name} <span className="text-gray-500 font-normal ml-1 text-xs">• 1st</span>
                                                    </Link>
                                                    <p className="text-xs text-gray-500 line-clamp-1">{post.author_headline || 'Davos Attendee'}</p>
                                                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                        {new Date(post.created_at).toLocaleDateString()} • <span className="w-1 h-1 bg-gray-400 rounded-full inline-block"></span>
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="px-4 pb-3">
                                                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                                            </div>
                                            
                                            {post.image_url && (
                                                <div className="w-full bg-wef-gray border-y border-wef-border">
                                                    <img src={post.image_url} alt="Post content" className="w-full max-h-[500px] object-cover" />
                                                </div>
                                            )}

                                            <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-b border-wef-border">
                                                <div className="flex items-center gap-1">
                                                    <span className="bg-blue-500 rounded-full p-0.5"><Heart size={8} className="text-white fill-white"/></span>
                                                    <span>{post.likes_count}</span>
                                                </div>
                                                <div className="flex gap-2 hover:underline cursor-pointer">
                                                    <span>{post.comments?.length || Math.floor(Math.random() * 5)} comments</span>
                                                </div>
                                            </div>

                                            <div className="px-2 py-1 flex justify-between items-center text-gray-500 font-medium text-xs sm:text-sm">
                                                <button 
                                                    onClick={() => handleLike(post.id)} 
                                                    className={`flex items-center justify-center gap-1 sm:gap-2 px-2 py-3 w-1/4 rounded hover:bg-wef-gray transition-colors ${post.user_liked ? 'text-wef-blue' : ''}`}
                                                >
                                                    <Heart size={18} className={post.user_liked ? "fill-current" : ""} /> <span className="hidden sm:inline">Like</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 py-3 w-1/4 rounded hover:bg-wef-gray transition-colors">
                                                    <MessageSquare size={18} /> <span className="hidden sm:inline">Comment</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 py-3 w-1/4 rounded hover:bg-wef-gray transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2.1l4 4-4 4"/><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"/><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"/></svg>
                                                    <span className="hidden sm:inline">Repost</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 py-3 w-1/4 rounded hover:bg-wef-gray transition-colors text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                                    <span className="hidden sm:inline">Send</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Feed Right Sidebar - Trending */}
                            <div className="hidden lg:block lg:col-span-1 space-y-4">
                                <div className="bg-white rounded-sm border border-wef-border shadow-sm p-4 overflow-hidden">
                                    <h3 className="font-bold text-[16px] text-wef-dark mb-4 filter drop-shadow">Forum Insights ✨ <br/><span className="text-gray-400 text-xs font-normal">Davos Edition</span></h3>
                                    <ul className="space-y-3">
                                        <li className="cursor-pointer group flex flex-col gap-0.5">
                                            <div className="font-semibold text-sm text-gray-700 line-clamp-2 px-2 hover:text-wef-blue hover:underline transition-colors">• Geopolitics in 2026: Shift</div>
                                            <span className="text-xs text-gray-500 px-4">Top news • 12,394 readers</span>
                                        </li>
                                        <li className="cursor-pointer group flex flex-col gap-0.5">
                                            <div className="font-semibold text-sm text-gray-700 line-clamp-2 px-2 hover:text-wef-blue hover:underline transition-colors">• Agentic AI takes over</div>
                                            <span className="text-xs text-gray-500 px-4">Trending • 45,190 readers</span>
                                        </li>
                                        <li className="cursor-pointer group flex flex-col gap-0.5">
                                            <div className="font-semibold text-sm text-gray-700 line-clamp-2 px-2 hover:text-wef-blue hover:underline transition-colors">• Climate Action goals updated</div>
                                            <span className="text-xs text-gray-500 px-4">Top news • 9,481 readers</span>
                                        </li>
                                    </ul>
                                    <button className="mt-4 px-2 py-1 rounded hover:bg-wef-gray text-sm font-semibold text-gray-600 flex items-center gap-1 transition-colors">
                                        Show more <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Community;
