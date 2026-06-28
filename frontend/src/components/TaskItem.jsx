import React from 'react';
import { Edit2, Trash2, Calendar, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed': return 'badge-completed';
      case 'in-progress': return 'badge-in-progress';
      default: return 'badge-pending';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high': return 'badge-priority-high';
      case 'medium': return 'badge-priority-medium';
      default: return 'badge-priority-low';
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
      <div className="flex-between">
        <h3 className="heading-2" style={{ margin: 0, fontSize: '1.25rem', paddingRight: '2rem' }}>
          {task.title}
        </h3>
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => onEdit(task)} className="btn btn-icon" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            <Edit2 size={16} />
          </button>
          <button onClick={() => onDelete(task._id)} className="btn btn-icon" style={{ background: 'rgba(239, 71, 111, 0.15)', color: 'var(--color-danger)' }}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {task.description && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          {task.description}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className={`badge ${getStatusBadgeClass(task.status)}`} style={{ cursor: 'pointer' }} onClick={() => {
            const nextStatus = task.status === 'pending' ? 'in-progress' : task.status === 'in-progress' ? 'completed' : 'pending';
            onStatusChange(task._id, nextStatus);
          }}>
            {task.status.replace('-', ' ')}
          </span>
          <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
            {task.priority} priority
          </span>
        </div>
        
        {task.dueDate && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: 'auto' }}>
            <Calendar size={14} />
            <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
