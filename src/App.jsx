import { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterTabs from './components/FilterTabs';
import './App.css';

function App() {
  const [filter, setFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const tasks = useSelector((state) => state.todos.tasks);
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const done = tasks.filter((t) => t.status === 'Done').length;

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return t.status === 'Pending';
    if (filter === 'done') return t.status === 'Done';
    return true;
  });

  const counts = { all: tasks.length, pending, done };

  const filterLabels = { all: 'All Tasks', pending: 'Pending Tasks', done: 'Completed Tasks' };

  return (
    <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <Sidebar filter={filter} onFilterChange={(f) => { setFilter(f); setSidebarOpen(false); }} />

      {/* Main Content */}
      <div className="main-panel">
        {/* Top bar */}
        <header className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="topbar-title">
            <h1>{filterLabels[filter]}</h1>
            <span className="topbar-count">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="topbar-right">
            <div className="topbar-date">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="content">
          <TaskForm />

          {/* Mobile filter tabs */}
          <FilterTabs filter={filter} onFilterChange={setFilter} counts={counts} />

          <TaskList tasks={filteredTasks} />
        </main>
      </div>
    </div>
  );
}

export default App;
