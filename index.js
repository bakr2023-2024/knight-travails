const N = 8;
const outOfBounds = ([x, y]) => x < 0 || x >= N || y < 0 || y >= N;
const getNeighbors = ([x, y], filter) => {
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
  return vectors.map(([dx, dy]) => [x + dx, y + dy]).filter(filter);
};
const knightMoves = ([sx, sy], [ex, ey]) => {
  const q = [[sx, sy]];
  const table = [];
  const visited = [[sx, sy]];
  while (q.length !== 0 && visited.length < N * N) {
    const [cx, cy] = q.shift();
    table.push([cx, cy]);
    if (cx == ex && cy == ey) return constructPath(start, end, table);
    const neighbors = getNeighbors(
      [cx, cy],
      ([x, y]) =>
        !outOfBounds([x, y]) && !visited.some(([ax, ay]) => x == ax && y == ay)
    );
    q.push(...neighbors);
    visited.push(...neighbors);
  }
  return null;
};
const path = knightMoves([3, 3], [4, 3]);
console.log(
  !path
    ? "Invalid start/end vertices"
    : `You made it in ${path.length} moves!  Here's your path:`,
  path
);
