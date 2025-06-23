
import React, { useState } from 'react';
import { Plus, Clock } from 'lucide-react';

interface TimeBlockProps {
  hour: string;
  isCurrentHour: boolean;
}

export const TimeBlock: React.FC<TimeBlockProps> = ({ hour, isCurrentHour }) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
      setIsAdding(false);
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className={`relative group ${isCurrentHour ? 'scale-105' : ''}`}>
      {/* Glow effect for current hour */}
      {isCurrentHour && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl animate-pulse" />
      )}
      
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              isCurrentHour 
                ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-400' 
                : 'bg-white/10 text-slate-400'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
            <h3 className={`text-xl font-semibold ${
              isCurrentHour ? 'text-cyan-400' : 'text-white'
            }`}>
              {hour}
            </h3>
            {isCurrentHour && (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-100" />
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping delay-200" />
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsAdding(true)}
            className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group/task"
            >
              <span className="text-slate-300">{task}</span>
              <button
                onClick={() => removeTask(index)}
                className="text-red-400 opacity-0 group-hover/task:opacity-100 hover:text-red-300 transition-all duration-300"
              >
                ×
              </button>
            </div>
          ))}

          {isAdding && (
            <div className="flex items-center space-x-2 p-3 bg-white/5 border border-cyan-500/30 rounded-xl">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                onBlur={addTask}
                placeholder="Add a task..."
                className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none"
                autoFocus
              />
            </div>
          )}

          {tasks.length === 0 && !isAdding && (
            <div className="text-center py-8 text-slate-500">
              <p>No tasks scheduled</p>
              <p className="text-sm mt-1">Click + to add a task</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
