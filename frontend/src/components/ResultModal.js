import React from 'react';

const ResultModal = ({ isOpen, onClose, result, error }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: error ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
            {error ? '❌ Pipeline Error' : '✅ Pipeline Analysis Results'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#64748b',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.background = '#f1f5f9')}
            onMouseOut={(e) => (e.target.style.background = 'none')}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {error ? (
            <div>
              <div style={{ 
                padding: '16px', 
                background: '#fef2f2', 
                borderRadius: '8px', 
                border: '1px solid #fecaca',
                marginBottom: '16px',
              }}>
                <p style={{ margin: 0, color: '#991b1b', fontSize: '14px', lineHeight: '1.6' }}>
                  <strong>Error:</strong> {error}
                </p>
              </div>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                Make sure the backend is running on <code style={{ 
                  background: '#f1f5f9', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontSize: '13px',
                }}>http://localhost:8000</code>
              </p>
            </div>
          ) : result ? (
            <div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px',
                marginBottom: '24px',
              }}>
                <div style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  borderRadius: '8px',
                  border: '2px solid #3b82f6',
                }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                    Number of Nodes
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b' }}>
                    📊 {result.num_nodes}
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderRadius: '8px',
                  border: '2px solid #10b981',
                }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                    Number of Edges
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b' }}>
                    🔗 {result.num_edges}
                  </div>
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: result.is_dag 
                  ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' 
                  : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                borderRadius: '8px',
                border: result.is_dag ? '2px solid #10b981' : '2px solid #ef4444',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                  {result.is_dag ? '✅' : '❌'}
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#1e293b',
                  marginBottom: '8px',
                }}>
                  {result.is_dag ? 'Valid DAG Structure' : 'Not a DAG (contains cycles)'}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  {result.is_dag 
                    ? '🎉 Your pipeline is valid and ready to execute!' 
                    : '⚠️ Please remove cycles from your pipeline.'}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 24px',
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;