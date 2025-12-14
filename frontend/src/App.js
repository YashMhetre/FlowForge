import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import BaseNode from './components/BaseNode';
import ResultModal from './components/ResultModal';
import Toolbar from './components/Toolbar';
import { nodeConfigs } from './config/nodeConfigs';

const nodeTypes = {
  base: BaseNode,
};

const VectorShiftApp = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeType, setSelectedNodeType] = useState('input');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMenu, setShowMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalResult, setModalResult] = useState(null);
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true, 
      style: { 
        stroke: '#1e293b', 
        strokeWidth: 3 
      },
      markerEnd: {
        type: 'arrowclosed',
        color: '#1e293b',
      }
    }, eds)),
    [setEdges]
  );

  const handleNodeDataChange = useCallback((nodeId, newValue) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId && node.data.type === 'text') {
          const regex = /\{\{\s*(\w+)\s*\}\}/g;
          const matches = [...newValue.matchAll(regex)];
          const variables = [...new Set(matches.map(m => m[1]))];
          
          return {
            ...node,
            data: {
              ...node.data,
              value: newValue,
              inputs: variables.length > 0 ? variables : ['input'],
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const addNode = () => {
    const config = nodeConfigs[selectedNodeType];
    const centerX = window.innerWidth / 2 - 100;
    const centerY = window.innerHeight / 2 - 100;
    const newNode = {
      id: `${selectedNodeType}_${Date.now()}`,
      type: 'base',
      position: { 
        x: centerX + (Math.random() * 200 - 100), 
        y: centerY + (Math.random() * 200 - 100) 
      },
      data: {
        ...config,
        value: '',
        onChange: handleNodeDataChange,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setShowMenu(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error('Backend request failed');

      const result = await response.json();
      setModalResult(result);
      setModalError(null);
      setModalOpen(true);
    } catch (error) {
      setModalResult(null);
      setModalError(error.message);
      setModalOpen(true);
    }
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'hidden',
    }}>
      <Toolbar
        isMobile={isMobile}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        selectedNodeType={selectedNodeType}
        setSelectedNodeType={setSelectedNodeType}
        addNode={addNode}
        handleSubmit={handleSubmit}
        nodeConfigs={nodeConfigs}
      />

      <div style={{ flex: 1, width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={2}
        >
          <Background color="#94a3b8" gap={16} />
          <Controls 
            style={{ 
              background: 'white', 
              border: '2px solid #cbd5e1', 
              borderRadius: '8px',
              left: isMobile ? '10px' : 'auto',
              bottom: isMobile ? '10px' : 'auto',
            }} 
          />
          {!isMobile && (
            <MiniMap
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid #cbd5e1',
                borderRadius: '8px',
              }}
              nodeColor={(node) => {
                const colors = {
                  input: '#3b82f6',
                  output: '#10b981',
                  llm: '#8b5cf6',
                  text: '#f59e0b',
                  transformer: '#ec4899',
                  api: '#06b6d4',
                  database: '#6366f1',
                  validator: '#84cc16',
                  filter: '#f97316',
                };
                return colors[node.data.type] || '#64748b';
              }}
            />
          )}
        </ReactFlow>
      </div>

      <ResultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        result={modalResult}
        error={modalError}
      />
    </div>
  );
};

export default VectorShiftApp;