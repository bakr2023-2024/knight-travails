const N = 8;
class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `${this.x},${this.y}`;
  }
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
  neighbors() {
    const vectors = [
      [-2, 1],
      [-1, 2],
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
    ];
    return vectors
      .map(([dx, dy]) => new Vertex(this.x + dx, this.y + dy))
      .filter((p) => p.x >= 0 && p.x < N && p.y >= 0 && p.y < N);
  }
}
const constructPath = (table, end) => {
  const path = [];
  let ptr = end.toString();
  while (ptr) {
    const [x, y] = ptr.split(",").map(Number);
    path.push(new Vertex(x, y));
    ptr = table.get(ptr).prev;
  }
  return path.reverse();
};
function knightMoves(start, end) {
  const queue = [start];
  const table = new Map();
  table.set(start.toString(), { prev: null, cost: 0 });
  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr.equals(end)) break;
    for (const neighbor of curr.neighbors()) {
      const key = neighbor.toString();
      if (!table.has(key)) {
        const currKey = curr.toString();
        table.set(key, {
          prev: currKey,
          cost: table.get(currKey).cost + 1,
        });
        queue.push(neighbor);
      }
    }
  }
  return constructPath(table, end);
}
const path = knightMoves(new Vertex(0, 0), new Vertex(7, 7));
console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
console.log(path.map((p) => `(${p.x}, ${p.y})`).join(" -> "));
