import { useSelector } from 'react-redux';

export default function Sidebar({ filter, onFilterChange }) {
  const tasks = useSelector((state) => state.todos.tasks);
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const done = tasks.filter((t) => t.status === 'Done').length;

  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  const filters = [
    { key: 'all', label: 'All Tasks', count: total, icon: 'inbox' },
    { key: 'pending', label: 'Pending', count: pending, icon: 'clock' },
    { key: 'done', label: 'Completed', count: done, icon: 'check' },
  ];

  const icons = {
    inbox: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.75 12a2.25 2.25 0 0 0-2.25-2.25H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0 .75.75 0 0 0-.75-.75H4.5A2.25 2.25 0 0 0 2.25 12v6a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-6Z" />
        <path d="M3.328 8.818A2.25 2.25 0 0 1 4.5 6h15a2.25 2.25 0 0 1 1.172 2.818" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  };

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
          </svg>
        </div>
        <div className="brand-text">
          <span className="brand-name">Taskflow</span>
          <span className="brand-tag">Task Manager</span>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="progress-card">
        <div className="progress-ring-wrapper">
          <svg className="progress-ring" viewBox="0 0 80 80">
            <circle className="progress-ring-bg" cx="40" cy="40" r="34" />
            <circle
              className="progress-ring-fill"
              cx="40"
              cy="40"
              r="34"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
            />
          </svg>
          <span className="progress-value">{progress}%</span>
        </div>
        <div className="progress-label">
          <span className="progress-title">Progress</span>
          <span className="progress-detail">{done} of {total} tasks done</span>
        </div>
      </div>

      {/* Filter Nav */}
      <nav className="sidebar-nav">
        <span className="nav-heading">Views</span>
        {filters.map((f) => (
          <button
            key={f.key}
            className={`nav-item ${filter === f.key ? 'active' : ''}`}
            onClick={() => onFilterChange(f.key)}
          >
            <span className="nav-icon">{icons[f.icon]}</span>
            <span className="nav-label">{f.label}</span>
            <span className="nav-count">{f.count}</span>
          </button>
        ))}
      </nav>

      {/* Keyboard shortcuts hint */}
      <div className="sidebar-footer">
        <div className="kbd-hint">
          <kbd>Enter</kbd> to add task
        </div>
      </div>
    </aside>
  );
}
