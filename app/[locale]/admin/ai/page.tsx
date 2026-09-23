'use client';

import { useEffect, useState } from 'react';

interface Conversation {
  id: string;
  type: 'booking' | 'lead' | 'affiliate';
  phone: string;
  name: string;
  state: 'ai_active' | 'human_needed' | 'closed' | 'waiting_user';
  lastMessage: string;
  lastMessageAt: string | null;
  unreadCount: number;
  aiMetrics: {
    resolved: number;
    escalated: number;
    avgConfidence: number;
  };
}

const STAT_COLORS = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  gray: 'bg-gray-500',
} as const;

export default function AIWhatsAppDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filter, setFilter] = useState<'all' | 'ai_active' | 'human_needed' | 'closed'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch('/api/admin/ai-conversations');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setConversations(data.conversations || []);
      } catch (err) {
        console.error('Error fetching AI conversations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    const interval = setInterval(fetchConversations, 30000);
    return () => clearInterval(interval);
  }, []);

  const filtered = filter === 'all'
    ? conversations
    : conversations.filter(c => c.state === filter);

  const stats = {
    active: conversations.filter(c => c.state === 'ai_active').length,
    escalated: conversations.filter(c => c.state === 'human_needed').length,
    closed: conversations.filter(c => c.state === 'closed').length,
    avgConfidence: conversations.length
      ? conversations.reduce((s, c) => s + c.aiMetrics.avgConfidence, 0) / conversations.length
      : 0,
  };

  if (loading) {
    return <div className="p-6">Cargando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">IA WhatsApp - Centro de Control</h1>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as any)}
          className="px-3 py-1 border rounded"
        >
          <option value="all">Todas</option>
          <option value="ai_active">IA Activa</option>
          <option value="human_needed">Escalacion Humana</option>
          <option value="closed">Cerradas</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="IA Activa" value={stats.active} color="green" />
        <StatCard title="Escaladas" value={stats.escalated} color="red" />
        <StatCard title="Cerradas" value={stats.closed} color="gray" />
        <StatCard title="Confianza Prom." value={`${(stats.avgConfidence * 100).toFixed(0)}%`} color="blue" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Telefono</th>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Ultimo Mensaje</th>
              <th className="p-3 text-left">Confianza</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(conv => (
              <tr key={conv.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{conv.name}</td>
                <td className="p-3">{conv.phone}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded ${conv.type === 'booking' ? 'bg-blue-100' : conv.type === 'lead' ? 'bg-green-100' : 'bg-purple-100'}`}>
                    {conv.type}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    conv.state === 'ai_active' ? 'bg-green-100 text-green-800' :
                    conv.state === 'human_needed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {conv.state.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-3 max-w-xs truncate">{conv.lastMessage}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <div className="w-24 h-2 bg-gray-200 rounded">
                      <div className="h-full bg-blue-500 rounded" style={{ width: `${conv.aiMetrics.avgConfidence * 100}%` }} />
                    </div>
                    <span className="text-xs">{(conv.aiMetrics.avgConfidence * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="p-3 space-x-2">
                  {conv.state === 'human_needed' && (
                    <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                      Tomar Control
                    </button>
                  )}
                  {conv.state === 'ai_active' && (
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Ver Chat
                    </button>
                  )}
                  <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700">
                    Cerrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number | string; color: keyof typeof STAT_COLORS }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow border">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <div className={`w-12 h-1 ${STAT_COLORS[color]} rounded mt-2`} />
    </div>
  );
}
