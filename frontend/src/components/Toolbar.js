import React from 'react';

const Toolbar = ({ 
  isMobile, 
  showMenu, 
  setShowMenu, 
  selectedNodeType, 
  setSelectedNodeType, 
  addNode, 
  handleSubmit,
  nodeConfigs 
}) => {
  return (
    <div style={{
      padding: isMobile ? '12px 16px' : '16px 24px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
      display: 'flex',
      gap: isMobile ? '8px' : '16px',
      alignItems: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      flexWrap: 'wrap',
    }}>
      <h1 style={{ 
        margin: 0, 
        fontSize: isMobile ? '16px' : '24px', 
        fontWeight: 'bold', 
        color: '#1e293b', 
        flex: isMobile ? '1 1 100%' : 1,
        textAlign: isMobile ? 'center' : 'left',
      }}>
        🚀 VectorShift Pipeline Builder
      </h1>
      
      {isMobile ? (
        <>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              padding: '10px 16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              flex: 1,
            }}
          >
            {showMenu ? '✕ Close' : '➕ Add Node'}
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: '10px 16px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              flex: 1,
            }}
          >
            🚀 Submit
          </button>
          
          {showMenu && (
            <div style={{
              flex: '1 1 100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              marginTop: '8px',
            }}>
              {Object.keys(nodeConfigs).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedNodeType(type);
                    addNode();
                  }}
                  style={{
                    padding: '12px',
                    background: 'white',
                    border: '2px solid #cbd5e1',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{nodeConfigs[type].icon}</span>
                  <span>{nodeConfigs[type].label}</span>
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <select
            value={selectedNodeType}
            onChange={(e) => setSelectedNodeType(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '6px',
              border: '2px solid #cbd5e1',
              fontSize: '14px',
              cursor: 'pointer',
              background: 'white',
            }}
          >
            {Object.keys(nodeConfigs).map((type) => (
              <option key={type} value={type}>
                {nodeConfigs[type].icon} {nodeConfigs[type].label}
              </option>
            ))}
          </select>
          <button
            onClick={addNode}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            ➕ Add Node
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Submit Pipeline
          </button>
        </>
      )}
    </div>
  );
};

export default Toolbar;