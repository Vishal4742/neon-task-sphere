
import React, { useState } from 'react';
import { Archive, Calendar, Clock, RotateCcw, Trash2, Search } from 'lucide-react';

interface ArchivedItem {
  id: string;
  title: string;
  type: 'task' | 'event' | 'reminder';
  completedDate: string;
  originalDate?: string;
  description?: string;
}

export const ArchivePanel: React.FC = () => {
  const [archivedItems, setArchivedItems] = useState<ArchivedItem[]>([
    {
      id: '1',
      title: 'Finish project presentation',
      type: 'task',
      completedDate: '2024-01-10',
      originalDate: '2024-01-09',
      description: 'Created slides for quarterly review'
    },
    {
      id: '2',
      title: 'Team building event',
      type: 'event',
      completedDate: '2024-01-08',
      originalDate: '2024-01-08',
      description: 'Company retreat at the lake'
    },
    {
      id: '3',
      title: 'Call dentist',
      type: 'reminder',
      completedDate: '2024-01-05',
      originalDate: '2024-01-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'task' | 'event' | 'reminder'>('all');

  const filteredItems = archivedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const restoreItem = (id: string) => {
    // In a real app, this would restore the item to its original location
    console.log('Restoring item:', id);
    // For demo, we'll just remove it from archive
    setArchivedItems(items => items.filter(item => item.id !== id));
  };

  const permanentlyDelete = (id: string) => {
    setArchivedItems(items => items.filter(item => item.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return <Clock className="w-4 h-4 text-cyan-400" />;
      case 'event': return <Calendar className="w-4 h-4 text-purple-400" />;
      case 'reminder': return <Archive className="w-4 h-4 text-pink-400" />;
      default: return <Archive className="w-4 h-4 text-slate-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task': return 'from-cyan-500/10 to-blue-500/10 border-cyan-400/20';
      case 'event': return 'from-purple-500/10 to-indigo-500/10 border-purple-400/20';
      case 'reminder': return 'from-pink-500/10 to-rose-500/10 border-pink-400/20';
      default: return 'from-slate-500/10 to-gray-500/10 border-slate-400/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search archived items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'task' | 'event' | 'reminder')}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="task">Tasks</option>
            <option value="event">Events</option>
            <option value="reminder">Reminders</option>
          </select>
        </div>
      </div>

      {/* Archive Grid */}
      <div className="relative">
        {/* Frost effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-blue-900/10 to-purple-900/20 rounded-3xl backdrop-blur-sm" />
        <div className="absolute inset-0 bg-white/5 rounded-3xl" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(120, 200, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(200, 120, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(255, 200, 200, 0.05) 0%, transparent 50%)`
        }} />
        
        <div className="relative backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`relative group backdrop-blur-sm bg-gradient-to-r ${getTypeColor(item.type)} border rounded-2xl p-6 hover:scale-105 transition-all duration-300`}
              >
                {/* Frost texture overlay */}
                <div className="absolute inset-0 opacity-30 rounded-2xl" style={{
                  backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%),
                                   radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)`
                }} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <span className="text-slate-400 text-sm capitalize">{item.type}</span>
                    </div>
                    
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => restoreItem(item.id)}
                        className="p-1 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors duration-300"
                        title="Restore"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => permanentlyDelete(item.id)}
                        className="p-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-300"
                        title="Delete permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-white font-semibold mb-3">{item.title}</h3>
                  
                  {item.description && (
                    <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                  )}

                  <div className="space-y-1 text-slate-500 text-xs">
                    {item.originalDate && (
                      <div>Original: {item.originalDate}</div>
                    )}
                    <div>Archived: {item.completedDate}</div>
                  </div>
                </div>

                {/* Frozen crystal effect */}
                <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full animate-ping" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-cyan-400/50 to-blue-400/50 rounded-full" />
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Archive className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold text-slate-500 mb-2">
                {searchTerm || filterType !== 'all' ? 'No matching items found' : 'Archive is empty'}
              </h3>
              <p className="text-slate-600">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Completed items will appear here when archived'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['all', 'task', 'event', 'reminder'].map((type) => {
          const count = type === 'all' 
            ? archivedItems.length 
            : archivedItems.filter(item => item.type === type).length;
          
          return (
            <div key={type} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400">{count}</div>
              <div className="text-slate-400 text-sm capitalize">
                {type === 'all' ? 'Total Items' : `${type}s`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
