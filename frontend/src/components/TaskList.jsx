import React from 'react';
import TaskItem from './TaskItem';
import { Filter, ArrowUpDown } from 'lucide-react';

const TaskList = ({ tasks, onEdit, onDelete, onStatusChange, filters, setFilters }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="heading-2" style={{ margin: 0 }}>Your Tasks</h2>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Filter size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <select 
              className="form-select" 
              style={{ paddingLeft: '2.5rem', width: 'auto' }}
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div style={{ position: 'relative' }}>
            <ArrowUpDown size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <select 
              className="form-select" 
              style={{ paddingLeft: '2.5rem', width: 'auto' }}
              value={filters.sort}
              onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
            >
              <option value="createdAt_desc">Newest First</option>
              <option value="dueDate_asc">Due Date (Soonest)</option>
              <option value="dueDate_desc">Due Date (Latest)</option>
            </select>
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="glass-card flex-center" style={{ minHeight: '200px', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '50%' }}>
            <Filter size={32} color="var(--text-secondary)" />
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>No tasks found. Try adjusting your filters or create a new one!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onEdit={onEdit} 
              onDelete={onDelete} 
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
