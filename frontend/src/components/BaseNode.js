import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ data, id }) => {
  const [localData, setLocalData] = useState(data);
  const [nodeWidth, setNodeWidth] = useState(220);
  const textareaRef = useRef(null);
  const measureRef = useRef(null);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Auto-resize textarea and calculate width based on content
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      // Reset height to get accurate scrollHeight
      textarea.style.height = 'auto';
      const newHeight = Math.max(60, textarea.scrollHeight);
      textarea.style.height = `${newHeight}px`;
      
      // Calculate width for text nodes
      if (data.type === 'text') {
        const lines = (localData.value || '').split('\n');
        const maxLineLength = Math.max(...lines.map(line => line.length), 15);
        
        // Use canvas to measure actual text width more accurately
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '11px monospace';
        
        let maxWidth = 0;
        lines.forEach(line => {
          const metrics = context.measureText(line);
          maxWidth = Math.max(maxWidth, metrics.width);
        });
        
        // Add padding and constraints
        const calculatedWidth = Math.max(220, Math.min(maxWidth + 60, 650));
        setNodeWidth(calculatedWidth);
      }
    }
  }, [localData.value, data.type]);

  const nodeStyles = {
    base: {
      padding: '12px',
      borderRadius: '8px',
      border: '2px solid',
      background: 'white',
      minWidth: '150px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'width 0.2s ease, height 0.2s ease',
    },
    input: { borderColor: '#3b82f6', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' },
    output: { borderColor: '#10b981', background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' },
    llm: { borderColor: '#8b5cf6', background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)' },
    text: { borderColor: '#f59e0b', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' },
    transformer: { borderColor: '#ec4899', background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' },
    api: { borderColor: '#06b6d4', background: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)' },
    database: { borderColor: '#6366f1', background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)' },
    validator: { borderColor: '#84cc16', background: 'linear-gradient(135deg, #f7fee7 0%, #ecfccb 100%)' },
    filter: { borderColor: '#f97316', background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)' },
  };

  const getStyle = () => {
    const baseStyle = {
      ...nodeStyles.base,
      ...(nodeStyles[data.type] || nodeStyles.text),
    };
    
    // For non-text nodes, set max width
    if (data.type !== 'text') {
      return {
        ...baseStyle,
        maxWidth: '250px',
      };
    }
    
    // For text nodes, use calculated width
    return {
      ...baseStyle,
      width: `${nodeWidth}px`,
    };
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalData({ ...localData, value: newValue });
    if (data.onChange) {
      data.onChange(id, newValue);
    }
  };

  const renderHandles = () => {
    const handles = [];
    
    // For text nodes, render handles based on extracted variables
    if (data.type === 'text' && data.inputs && data.inputs.length > 0) {
      data.inputs.forEach((input, idx) => {
        handles.push(
          <Handle
            key={`input-${input}-${idx}`}
            type="target"
            position={Position.Left}
            id={input}
            style={{
              top: `${((idx + 1) * 100) / (data.inputs.length + 1)}%`,
              background: '#f59e0b',
              width: '12px',
              height: '12px',
              border: '2px solid white',
              cursor: 'crosshair',
            }}
          />
        );
      });
      
      // Add label badges for each variable
      data.inputs.forEach((input, idx) => {
        handles.push(
          <div
            key={`label-${input}-${idx}`}
            style={{
              position: 'absolute',
              left: '-8px',
              top: `${((idx + 1) * 100) / (data.inputs.length + 1)}%`,
              transform: 'translate(-100%, -50%)',
              background: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '10px',
              fontWeight: 'bold',
              color: '#92400e',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {input}
          </div>
        );
      });
    } else if (data.inputs && data.type !== 'text') {
      // Standard input handles for non-text nodes
      data.inputs.forEach((input, idx) => {
        handles.push(
          <Handle
            key={`input-${idx}`}
            type="target"
            position={Position.Left}
            id={input}
            style={{
              top: `${((idx + 1) * 100) / (data.inputs.length + 1)}%`,
              background: '#64748b',
              width: '12px',
              height: '12px',
              border: '2px solid white',
              cursor: 'crosshair',
            }}
          />
        );
      });
    }

    if (data.outputs) {
      data.outputs.forEach((output, idx) => {
        handles.push(
          <Handle
            key={`output-${idx}`}
            type="source"
            position={Position.Right}
            id={output}
            style={{
              top: `${((idx + 1) * 100) / (data.outputs.length + 1)}%`,
              background: '#64748b',
              width: '12px',
              height: '12px',
              border: '2px solid white',
              cursor: 'crosshair',
            }}
          />
        );
      });
    }

    return handles;
  };

  return (
    <div style={getStyle()}>
      {renderHandles()}
      <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '13px', color: '#1e293b' }}>
        {data.icon && <span style={{ marginRight: '4px' }}>{data.icon}</span>}
        {data.label}
      </div>
      {data.showInput && (
        <textarea
          ref={textareaRef}
          value={localData.value || ''}
          onChange={handleInputChange}
          placeholder={data.placeholder || 'Enter value...'}
          style={{
            width: '100%',
            minHeight: '50px',
            padding: '6px',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            fontSize: '11px',
            resize: 'none',
            fontFamily: 'monospace',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        />
      )}
      {data.description && (
        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '6px' }}>
          {data.description}
        </div>
      )}
      {data.type === 'text' && data.inputs && data.inputs.length > 0 && (
        <div style={{ 
          fontSize: '9px', 
          color: '#92400e', 
          marginTop: '6px',
          background: '#fef3c7',
          padding: '4px',
          borderRadius: '3px',
        }}>
          Variables: {data.inputs.join(', ')}
        </div>
      )}
    </div>
  );
};

export default BaseNode;