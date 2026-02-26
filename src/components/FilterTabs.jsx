export default function FilterTabs({ filter, onFilterChange, counts }) {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'done', label: 'Done' },
  ];

  return (
    <div className="filter-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
          onClick={() => onFilterChange(tab.key)}
        >
          {tab.label}
          <span className="filter-tab-count">{counts[tab.key]}</span>
        </button>
      ))}
    </div>
  );
}
