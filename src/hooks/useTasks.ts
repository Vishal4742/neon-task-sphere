
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Task {
  id: string;
  title: string;
  description?: string;
  hour: number;
  date: string;
  status: 'pending' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const useTasks = (date?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .neq('status', 'archived')
        .order('hour', { ascending: true });

      if (date) {
        query = query.eq('date', date);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTasks(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: {
    title: string;
    description?: string;
    hour: number;
    date: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
  }) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            ...taskData,
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) throw error;
      
      setTasks(prev => [...prev, data]);
      toast.success('Task created successfully!');
      return data;
    } catch (error: any) {
      toast.error('Failed to create task');
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => prev.map(task => task.id === id ? data : task));
      toast.success('Task updated successfully!');
      return data;
    } catch (error: any) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error: any) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user, date]);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};
