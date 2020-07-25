class Node{
    constructor(id, distance){
        this.id = id;
        this.distance = distance;
    }
}

class Graph {
    constructor(){
        nodes = [];
        matrix = [];
        edges = [];
    }
    addNode(node){
        nodes[node.id] = new Node(node.id, 2048);
    }
    addEdge(edge){
        edges.push(edge);
        matrix[edge.start][edge.end] = edge.weight;
    }
    dijkstra(start, end){
        let visited = [];
        queue = new PriorityQueue();
        let startNode = new Node(start, 0);
        visited[start] = 0;
        let current = startNode;
        while(queue.size > 0){
            matrix[current.id].forEach(element =>{
                if(visited[current.id] == 0){
                    visited[current.id] = 1;
                    queue.enqueue(element);
                }
            });
            current = queue.dequeue();
        }
    }
}

class PriorityQueue {
    constructor() {
        queue = [];
        size = 0;
    }
    bubbleUp(index) {
        let current = index;
        while (queue[current].distance < queue[(current / 2) - 1].distance) {
            let temp = queue[current];
            queue[current] = queue[(current / 2) - 1];
            queue[(current / 2) - 1] = temp;
            current = (current / 2) - 1;
        }
    }
    bubbleDown(index) {
        let current = index;
        while (queue[current].distance > queue[(current * 2) + 1].distance || queue[current].distance > queue[(current * 2) + 2].distance) {
            if (queue[(current * 2) + 1].distance > queue[(current * 2) + 2].distance) {
                let temp = queue[current];
                queue[current] = queue[(current * 2) + 1];
                queue[(current * 2) + 1] = temp;
                current = (current * 2) + 1;
            } else {
                let temp = queue[current];
                queue[current] = queue[(current * 2) + 2];
                queue[(current * 2) + 2] = temp;
                current = (current * 2) + 2;
            }
        }
    }
    enqueue(node) {
        queue[size] = node;
        this.bubbleUp(size);
        size++;
    }
    dequeue() {
        let toReturn = queue[0];
        size--;
        queue[0] = queue[size];
        queue[size] = null;
        this.bubbleDown(0);
        return toReturn;
    }
    decreaseKey(index){

    }
}