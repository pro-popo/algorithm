/**
 * 유기농 배추를 재배하고자 한다.
 * 이때, 농약을 쓰지 않고 배추를 재배하려면 배추를 해출으로부터 보호하는 것이 중요하다.
 * 해충 방지에 효과적인 배추흰지렁이를 구입하고자 한다.
 * 특히, 한 배추에 배추흰지렁이가 한 마리 있다면, 인접한 다른 배추도 보호받을 수 있다.
 *
 * 배추를 재배하는 땅으 ㄴ고르지 못해 배추를 군데군데 심어 놓았다.
 * 이때, 모든 배추들을 보호하려면 최소 몇 마리의 지렁이가 필요한지 구하고자 한다.
 *
 * @param {number} T - 테스트 케이스
 * @param {number} N - 배추밭의 가로길이
 * @param {number} M - 배추밭의 세로길이
 * @param {number} K - 배추가 심어져 있는 위치의 개수
 * @param {number[][]} napaCabbages - 배추들의 위치 정보
 * @return - 각 테스트 케이스에 대해 필요한 최소의 배추흰지렁이 마리 수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 N x M 크기의 맵을 생성한다.
 *   배추들의 위치 정보를 순회하여, 맵에 표시한다.
 *
 *   맵을 순회하여 현재 위치에 배추가 존재하는 경우,
 *   지렁이를 추가하여 현재 위치를 시작으로 bfs를 진행한다.
 *   이때, bfs 과정에서 해당 지렁이로 보호할 수 있는 배추는 맵에서 제거한다.
 *
 *   모든 맵을 순회한 뒤, 추가한 지렁이를 반환한다.
 *   테스트 케이스만큼 위 과정을 반복하여 각 테스트 케이스마다 필요한 최소 지렁이 마리 수를 반환한다.
 */

function solution(T, data) {
    let answer = '';
    while (T--) {
        const [N, M, K] = data.shift().split(' ').map(Number);
        const napaCabbages = data
            .splice(0, K)
            .map(point => point.split(' ').map(Number));

        answer += countEarthworm(N, M, napaCabbages) + '\n';
    }

    return answer;
}

function countEarthworm(N, M, napaCabbages) {
    const map = Array.from(Array(N), () => Array(M).fill(false));
    for (const [r, c] of napaCabbages) {
        map[r][c] = true;
    }

    let earthworm = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (!map[i][j]) continue;
            earthworm++;
            bfs(i, j);
        }
    }
    return earthworm;

    function bfs(i, j) {
        const queue = [[i, j]];
        map[i][j] = false;

        const dt = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        while (queue.length) {
            const point = queue.shift();
            for (const move of dt) {
                const next = [point[0] + move[0], point[1] + move[1]];
                if (isOutOfRange(next) || !map[next[0]][next[1]]) continue;

                map[next[0]][next[1]] = false;
                queue.push(next);
            }
        }
    }

    function isOutOfRange(point) {
        return point[0] < 0 || point[1] < 0 || point[0] === N || point[1] === M;
    }
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    return [+data.shift(), data];
}

/****** TEST CASE *******/

const TEST1 = `2
10 8 17
0 0
1 0
1 1
4 2
4 3
4 5
2 4
3 4
7 4
8 4
9 4
7 5
8 5
9 5
7 6
8 6
9 6
10 10 1
5 5`;

console.log(solution(...input(TEST1)));
