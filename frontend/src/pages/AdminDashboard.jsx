import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  BookOpen,
  DollarSign,
  Clock,
  Compass,
  Package as PackageIcon,
  MessageSquare,
  Mail,
  ShieldAlert,
  ArrowLeft,
  Check,
  X,
  Plus,
  Trash2,
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('bookings');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    loadAdminData();
  }, [isAdmin, navigate]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, bookingsRes, usersRes, destsRes, pkgsRes, contactsRes, subsRes] =
        await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/bookings'),
          api.get('/admin/users'),
          api.get('/destinations'),
          api.get('/packages'),
          api.get('/admin/contact'),
          api.get('/admin/subscribers'),
        ]);

      if (statsRes.success) setStats(statsRes.data);
      if (bookingsRes.success) setBookings(bookingsRes.data);
      if (usersRes.success) setUsers(usersRes.data);
      if (destsRes.success) setDestinations(destsRes.data);
      if (pkgsRes.success) setPackages(pkgsRes.data);
      if (contactsRes.success) setContacts(contactsRes.data);
      if (subsRes.success) setSubscribers(subsRes.data);
    } catch (err) {
      showToast('Admin Notice', err.message || 'Error loading dashboard telemetry.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const res = await api.put(`/admin/bookings/${id}/status`, { status });
      if (res.success) {
        showToast('Status Updated', `Booking ref #${id.slice(-6)} set to ${status}`);
        loadAdminData();
      }
    } catch (err) {
      showToast('Error', err.message);
    }
  };

  const handleDeleteDestination = async (id) => {
    if (!window.confirm('Delete this destination?')) return;
    try {
      const res = await api.delete(`/destinations/${id}`);
      if (res.success) {
        showToast('Deleted', 'Destination removed');
        loadAdminData();
      }
    } catch (err) {
      showToast('Error', err.message);
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    try {
      const res = await api.delete(`/packages/${id}`);
      if (res.success) {
        showToast('Deleted', 'Package removed');
        loadAdminData();
      }
    } catch (err) {
      showToast('Error', err.message);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="bg-parchment min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-sandDark">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-taupe hover:text-terracotta mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Website
            </Link>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-terracotta" />
              <h1 className="font-serif text-3xl font-bold text-ink">Wanderly Admin Console</h1>
            </div>
          </div>
          <div className="text-right text-xs font-mono text-taupe">
            Logged in as <span className="font-bold text-ink">{user?.email}</span>
          </div>
        </div>

        {/* Top Summary Stat Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-sand border border-sandDark p-5">
              <div className="flex items-center justify-between text-taupe mb-2">
                <span className="text-[10px] uppercase tracking-widest font-mono font-semibold">Total Revenue</span>
                <DollarSign className="w-4 h-4 text-terracotta" />
              </div>
              <div className="font-serif text-2xl font-bold text-ink">
                ₹{stats.totalRevenue.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-sand border border-sandDark p-5">
              <div className="flex items-center justify-between text-taupe mb-2">
                <span className="text-[10px] uppercase tracking-widest font-mono font-semibold">Total Bookings</span>
                <BookOpen className="w-4 h-4 text-terracotta" />
              </div>
              <div className="font-serif text-2xl font-bold text-ink">{stats.totalBookings}</div>
              <div className="text-[10px] text-amber-800 font-mono mt-1">
                {stats.pendingBookings} Pending Verification
              </div>
            </div>

            <div className="bg-sand border border-sandDark p-5">
              <div className="flex items-center justify-between text-taupe mb-2">
                <span className="text-[10px] uppercase tracking-widest font-mono font-semibold">Registered Users</span>
                <Users className="w-4 h-4 text-terracotta" />
              </div>
              <div className="font-serif text-2xl font-bold text-ink">{stats.totalUsers}</div>
            </div>

            <div className="bg-sand border border-sandDark p-5">
              <div className="flex items-center justify-between text-taupe mb-2">
                <span className="text-[10px] uppercase tracking-widest font-mono font-semibold">Concierge Tickets</span>
                <Mail className="w-4 h-4 text-terracotta" />
              </div>
              <div className="font-serif text-2xl font-bold text-ink">{stats.totalContacts}</div>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex flex-wrap border-b border-sandDark mb-8 text-xs uppercase tracking-widest font-mono gap-2">
          {[
            { id: 'bookings', label: `Bookings (${bookings.length})` },
            { id: 'users', label: `Users (${users.length})` },
            { id: 'destinations', label: `Destinations (${destinations.length})` },
            { id: 'packages', label: `Packages (${packages.length})` },
            { id: 'contacts', label: `Contact Tickets (${contacts.length})` },
            { id: 'subscribers', label: `Subscribers (${subscribers.length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 transition-colors border-b-2 ${
                activeTab === t.id
                  ? 'border-terracotta text-terracotta font-bold bg-sand'
                  : 'border-transparent text-taupe hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="py-20 text-center text-xs font-mono text-taupe">Loading telemetry...</div>
        ) : (
          <div>
            {/* BOOKINGS TABLE */}
            {activeTab === 'bookings' && (
              <div className="overflow-x-auto bg-sand border border-sandDark">
                <table className="w-full text-left text-xs">
                  <thead className="bg-sandDark uppercase font-mono text-[10px] text-ink">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">User</th>
                      <th className="p-3">Expedition</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Travelers</th>
                      <th className="p-3">Server Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sandDark font-sans">
                    {bookings.map((b) => (
                      <tr key={b._id} className="hover:bg-parchment/60">
                        <td className="p-3 font-mono font-bold text-ink">#{b._id.slice(-6)}</td>
                        <td className="p-3">
                          <div className="font-semibold text-ink">{b.user?.name || b.contactDetails?.name}</div>
                          <div className="text-[10px] text-taupe">{b.user?.email || b.contactDetails?.email}</div>
                        </td>
                        <td className="p-3 font-serif font-medium">{b.package?.title || 'Expedition'}</td>
                        <td className="p-3">{new Date(b.travelDate).toLocaleDateString()}</td>
                        <td className="p-3">{b.numberOfTravelers}</td>
                        <td className="p-3 font-mono font-bold text-terracotta">₹{b.totalAmount.toLocaleString()}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 text-[9px] uppercase font-mono font-bold ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-900/20 text-emerald-800'
                                : b.status === 'cancelled'
                                ? 'bg-rose-900/20 text-rose-800'
                                : 'bg-amber-900/20 text-amber-800'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="p-3 flex gap-1">
                          {b.status !== 'confirmed' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(b._id, 'confirmed')}
                              className="px-2 py-1 bg-emerald-800 text-white text-[10px] uppercase font-semibold"
                            >
                              Confirm
                            </button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(b._id, 'cancelled')}
                              className="px-2 py-1 bg-rose-800 text-white text-[10px] uppercase font-semibold"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* USERS TABLE */}
            {activeTab === 'users' && (
              <div className="overflow-x-auto bg-sand border border-sandDark">
                <table className="w-full text-left text-xs">
                  <thead className="bg-sandDark uppercase font-mono text-[10px] text-ink">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sandDark">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-parchment/60">
                        <td className="p-3 font-semibold text-ink">{u.name}</td>
                        <td className="p-3 font-mono">{u.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 text-[9px] uppercase font-mono font-bold ${u.role === 'admin' ? 'bg-terracotta text-white' : 'bg-sandDark text-ink'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3">{u.phone || 'N/A'}</td>
                        <td className="p-3 text-[11px]">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* DESTINATIONS TABLE */}
            {activeTab === 'destinations' && (
              <div className="overflow-x-auto bg-sand border border-sandDark">
                <table className="w-full text-left text-xs">
                  <thead className="bg-sandDark uppercase font-mono text-[10px] text-ink">
                    <tr>
                      <th className="p-3">Destination</th>
                      <th className="p-3">Country</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Avg Rate</th>
                      <th className="p-3">Featured</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sandDark">
                    {destinations.map((d) => (
                      <tr key={d._id} className="hover:bg-parchment/60">
                        <td className="p-3 font-serif font-medium text-ink">{d.name}</td>
                        <td className="p-3">{d.country}</td>
                        <td className="p-3 font-mono text-[11px]">{d.category}</td>
                        <td className="p-3 font-mono">₹{d.averageCost.toLocaleString()}</td>
                        <td className="p-3">{d.featured ? 'Yes' : 'No'}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDeleteDestination(d._id)}
                            className="p-1 text-rose-800 hover:text-rose-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PACKAGES TABLE */}
            {activeTab === 'packages' && (
              <div className="overflow-x-auto bg-sand border border-sandDark">
                <table className="w-full text-left text-xs">
                  <thead className="bg-sandDark uppercase font-mono text-[10px] text-ink">
                    <tr>
                      <th className="p-3">Title</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sandDark">
                    {packages.map((p) => (
                      <tr key={p._id} className="hover:bg-parchment/60">
                        <td className="p-3 font-serif font-medium text-ink">{p.title}</td>
                        <td className="p-3">{p.duration}</td>
                        <td className="p-3 font-mono text-[11px]">{p.category}</td>
                        <td className="p-3 font-mono font-bold">₹{p.price.toLocaleString()}</td>
                        <td className="p-3 font-mono">★ {p.rating} ({p.reviewCount})</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDeletePackage(p._id)}
                            className="p-1 text-rose-800 hover:text-rose-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* CONTACT TICKETS TABLE */}
            {activeTab === 'contacts' && (
              <div className="overflow-x-auto bg-sand border border-sandDark">
                <table className="w-full text-left text-xs">
                  <thead className="bg-sandDark uppercase font-mono text-[10px] text-ink">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sandDark">
                    {contacts.map((c) => (
                      <tr key={c._id} className="hover:bg-parchment/60">
                        <td className="p-3 font-semibold text-ink">{c.name}</td>
                        <td className="p-3 font-mono">{c.email}</td>
                        <td className="p-3 font-medium">{c.subject}</td>
                        <td className="p-3 text-[11px] max-w-xs">{c.message}</td>
                        <td className="p-3 text-[11px]">{new Date(c.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SUBSCRIBERS TABLE */}
            {activeTab === 'subscribers' && (
              <div className="overflow-x-auto bg-sand border border-sandDark">
                <table className="w-full text-left text-xs">
                  <thead className="bg-sandDark uppercase font-mono text-[10px] text-ink">
                    <tr>
                      <th className="p-3">Subscriber Email</th>
                      <th className="p-3">Subscribed Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sandDark">
                    {subscribers.map((s) => (
                      <tr key={s._id} className="hover:bg-parchment/60">
                        <td className="p-3 font-mono text-ink">{s.email}</td>
                        <td className="p-3 text-[11px]">{new Date(s.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
