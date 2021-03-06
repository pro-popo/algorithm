/**
 * N x M의 모눈종이 위에 치즈가 표시되어 있다.
 * 이 치즈는 2변 이상이 공기와 접촉하면 정확히 한시간만에 녹아 없어진다.
 *
 * 치즈 내부에 있는 공간은 치즈 외부 공기와 접촉하지 않는 것으로 가정한다.
 * 즉, 이 공간과 접촉한 치즈 격자는 녹지 않는다.
 * 단, 이 공간으로 외부공기가 유입되면 해당 공간과 접촉한 치즈는 녹는다.
 *
 * 입력으로 주어진 치즈가 모두 녹아 없어지는데 걸리는 정확한 시간을 구하자.
 *
 * @param {*} N - 모눈종이의 세로 길이
 * @param {*} M - 모눈종이의 가로 길이
 * @param {*} map - 치즈가 있다면 1, 없다면 0
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 외부 공기와 접촉한 치즈들을 찾는다.
 *   [0,0]부터 시작하여 BFS를 진행한다.
 *   현재 위치를 기준으로 4방향을 탐색할 때,
 *   해당 위치가 치즈(1)인 경우 별도의 Map 객체에 관리한다.
 *   이때, key는 위치 정보를("x,y"), value는 외부 공기와 접촉한 횟수를 저장한다.
 *   반대로 공기(0)인 경우, 해당 위치를 queue에 저장한다.
 *   queue가 빌 때까지 위 과정을 반복한다.
 *
 *   위 과정에서 외부 공기와 접촉한 치즈를 찾았다면,
 *   조건에 해당하는 (2변 이상 외부 공기와 접촉한) 치즈를 map에서 제거한다.
 *   만약, 제거된 치즈가 존재하지 않는다면 반복문을 종료한다.
 *
 *   반복문이 종료되면, 위 과정을 몇번 진행했는지,
 *   즉, 모든 치즈가 녹기까지 얼마만큼의 시간이 지났는지 반환한다.
 */

function solution(N, M, map) {
    let day = 0;
    do {
        const cheeses = findContactCheeses(N, M, map);
        if (!cheeses.size) break;
        meltCheese(map, cheeses);
    } while (++day);

    return day;
}

function findContactCheeses(N, M, map) {
    const cheeses = new Map();

    const queue = [[0, 0]];
    const visited = Array.from(Array(N), () => Array(M).fill(false));
    visited[0][0] = true;
    while (queue.length) {
        const point = queue.shift();
        for (const move of direction()) {
            const next = [point[0] + move[0], point[1] + move[1]];
            if (isOutOfRange(next) || visited[next[0]][next[1]]) continue;
            if (map[next[0]][next[1]] === 1) {
                const key = `${next[0]} ${next[1]}`;
                cheeses.set(key, (cheeses.get(key) || 0) + 1);
                continue;
            }
            queue.push(next);
            visited[next[0]][next[1]] = true;
        }
    }

    return cheeses;

    function direction() {
        return [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
    }

    function isOutOfRange(point) {
        return point[0] < 0 || point[1] < 0 || point[0] === N || point[1] === M;
    }
}

function meltCheese(map, cheeses) {
    for (const [key, contact] of cheeses.entries()) {
        if (contact < 2) continue;
        const point = key.split(' ');
        map[point[0]][point[1]] = 0;
    }
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    const [N, M] = data.shift().split(' ').map(Number);
    const map = data.map(row => row.split(' ').map(Number));
    return [N, M, map];
}

/****** TEST CASE *******/

const TEST1 = `8 9
0 0 0 0 0 0 0 0 0
0 0 0 1 1 0 0 0 0
0 0 0 1 1 0 1 1 0
0 0 1 1 1 1 1 1 0
0 0 1 1 1 1 1 0 0
0 0 1 1 0 1 1 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0`;

console.log(solution(...input(TEST1)));
