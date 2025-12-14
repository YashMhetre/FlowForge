from typing import List, Dict, Any

def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """Check if graph is a Directed Acyclic Graph using DFS cycle detection."""

    adj_list = {node['id']: [] for node in nodes}
    
    for edge in edges:
        src = edge.get('source')
        tgt = edge.get('target')
        if src and tgt:
            adj_list.setdefault(src, []).append(tgt)

    color = {node['id']: 0 for node in nodes}  # 0=white, 1=grey, 2=black

    def has_cycle(node_id: str) -> bool:
        if color[node_id] == 1:
            return True
        if color[node_id] == 2:
            return False

        color[node_id] = 1  # visiting

        for neighbor in adj_list.get(node_id, []):
            if neighbor in color and has_cycle(neighbor):
                return True

        color[node_id] = 2
        return False

    for node_id in adj_list:
        if color[node_id] == 0:
            if has_cycle(node_id):
                return False

    return True
