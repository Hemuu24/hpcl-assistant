import os
import json
import heapq

def load_map(map_file=None):
    """
    Loads the refinery map from a JSON file.

    Returns:
        dict: A dictionary representing the graph.
    """
    if map_file is None:
        # Get the absolute path to the directory where this script is located
        script_dir = os.path.dirname(os.path.abspath(__file__))
        # Construct the absolute path to the map file
        map_file = os.path.join(script_dir, 'public', 'refinery_map.json')

    with open(map_file, 'r') as f:
        return json.load(f)

def find_route(graph, start, end, blocked=None):
    """
    Finds the fastest route between two points using Dijkstra's algorithm.

    Args:
        graph (dict): The graph representing the refinery layout.
        start (str): The starting node ID.
        end (str): The ending node ID.
        blocked (list): A list of blocked node IDs.

    Returns:
        list: The shortest path from start to end, or None if no path exists.
    """
    if blocked is None:
        blocked = []

    nodes = {node['id']: node for node in graph['nodes']}
    edges = graph['edges']

    if start not in nodes or end not in nodes:
        return None

    # Adjacency list representation of the graph
    adj = {node_id: [] for node_id in nodes}
    for edge in edges:
        if edge['from'] not in blocked and edge['to'] not in blocked:
            adj[edge['from']].append((edge['to'], edge['weight']))
            adj[edge['to']].append((edge['from'], edge['weight'])) # Assuming undirected graph

    # Dijkstra's algorithm
    distances = {node_id: float('inf') for node_id in nodes}
    distances[start] = 0
    previous_nodes = {node_id: None for node_id in nodes}
    
    pq = [(0, start)]

    while pq:
        current_distance, current_node_id = heapq.heappop(pq)

        if current_distance > distances[current_node_id]:
            continue

        if current_node_id == end:
            break

        for neighbor_id, weight in adj.get(current_node_id, []):
            distance = current_distance + weight
            if distance < distances[neighbor_id]:
                distances[neighbor_id] = distance
                previous_nodes[neighbor_id] = current_node_id
                heapq.heappush(pq, (distance, neighbor_id))

    # Reconstruct path
    path = []
    current_id = end
    while current_id is not None:
        path.insert(0, current_id)
        current_id = previous_nodes[current_id]

    if path and path[0] == start:
        return path
    else:
        return None 