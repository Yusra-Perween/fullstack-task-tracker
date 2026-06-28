import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import * as api from './services/api';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [filters, setFilters] = useState({
    status: '',
    sort: 'createdAt_desc'
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.sort) params.sort = filters.sort;
      
      const response = await api.getTasks(params);
      if (response.success) {
        setTasks(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch tasks. Make sure backend is running.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.createTask(taskData);
      if (response.success) {
        toast.success('Task created successfully!');
        setIsFormOpen(false);
        fetchTasks();
      }
    } catch (error) {
      toast.error(error.response?.data?.error?.[0] || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await api.updateTask(editingTask._id, taskData);
      if (response.success) {
        toast.success('Task updated successfully!');
        setEditingTask(null);
        setIsFormOpen(false);
        fetchTasks();
      }
    } catch (error) {
      toast.error(error.response?.data?.error?.[0] || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.deleteTask(id);
        toast.success('Task deleted!');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateTask(id, { status: newStatus });
      toast.success(`Task marked as ${newStatus.replace('-', ' ')}`);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  return (
    <div className="container animate-fade-in">
      <Toaster position="top-right" toastOptions={{
        style: {
          background: 'var(--bg-tertiary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--glass-border)',
        },
      }} />
      
      <Header />

      <main>
        <div className="flex-between">
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your daily goals efficiently.
          </p>
          <button onClick={openCreateForm} className="btn btn-primary">
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </div>

        {loading ? (
          <div className="flex-center" style={{ minHeight: '300px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onEdit={openEditForm} 
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </main>

      {isFormOpen && (
        <TaskForm 
          initialData={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
