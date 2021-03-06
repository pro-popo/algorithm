/**
 * 로봇 청소기가 주어졌을 때, 청소하는 영역의 개ㅜ를 구하는 프로그램을 작성하자.
 *
 * 로봇 청소기가 있는 장소는 N x M 크기의 직사각형으로,
 * 각각의 칸은 벽 또는 빈 칸이다.
 *
 * 청소기는 바라보는 방향이 있으며, 북/동/남/서(0,1,2,3) 중 하나이다.
 *
 * 로봇 청소기는 다음과 같이 작동한다.
 * 1. 현재 위치를 청소한다.
 * 2. 현재 위치에서 다음을 반복하면서 인접한 칸을 탐색한다.
 *    2-1. 현재 위치의 왼쪽에 청소하지 않은 빈 공간이 존재한다면,
 *         왼쪽 방향으로 회전한 다음 한 칸을 전진하고 1번으로 돌아간다.
 *         그렇지 않을 경우, 왼쪽 방향으로 회전한다. (현재 바라보는 방향을 기준으로)
 *
 *    2-2. 1번으로 돌아가거나 후진하지 않고 2-1번 단계가 연속적으로 네 번 실행되었을 경우
 *         바로 뒤쪽이 벽이라면 작동을 멈춘다. 그렇지 않다면 한 칸 후진한다.
 *
 * 빈 칸은 0, 벽은 1로 주어진다.
 *
 * @param {*} N - 세로 크기 (3~50)
 * @param {*} M - 가로 크기 (3~50)
 * @param {*} robot - 로봇 청소기 좌표, 방향
 * @param {*} map - 맵
 * @return - 로봇 청소기가 청소하는 칸의 개수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   1. 현재 위치를 청소한다.
 *   2. 로봇을 왼쪽 방향으로 이동한다.
 *      이동하기 전, 해당 칸을 이미 청소했거나 벽이거나 맵의 범위를 벗어난 경우 방향만 바꾼다.
 *      청소하지 않은 빈 공간을 찾을 때까지 2번 과정을 반복한다.
 *   3. 만약 주위(동서남북)가 전부 빈 공간이 아닌 경우, 해당 위치에서 뒤로 이동한다.
 *      뒤로 이동할 때에는, 벽 아니거나, 맵의 범위를 벗어나면 안된다. (이미 청소한 칸은 이동할 수 있음)
 *   4. 2~3번 과정에서 로봇을 이동시킬 수 없다면, 로봇의 작동을 멈춘다.
 *      반대로 이동시킬 수 있다면, 1번 과정으로 다시 돌아간다.
 *   위 과정에서 로봇이 청소한 횟수를 센 뒤 반환한다.
 *
 * - 로봇이 이동해야하는 방향에 대해,
 *   현재 방향에 따른 이동 위치를 미리 계산하여 활용하면 쉽게 구할 수 있다.
 *
 * - 처음에는 1,2번 과정을 묶어서 네 번 실행되었을 경우 후진을 하는 줄 알았다. 😅
 */

function solution(N, M, robot, map) {
    const CLEANED = 2;
    let countClean = 0;

    do {
        const [r, c] = robot;
        if (map[r][c] === 0) {
            map[r][c] = CLEANED;
            countClean++;
        }
    } while (goRobot() || goBackRobt());

    return countClean;

    function goRobot() {
        let [r, c, direction] = robot;

        for (let i = 0; i < 4; i++) {
            const next = Direction.go([r, c], direction);
            direction = Direction.rotate(direction);
            if (isOutOfRange(next) || map[next[0]][next[1]] > 0) continue;

            robot = [...next, direction];
            return true;
        }

        return false;
    }

    function goBackRobt() {
        const [r, c, direction] = robot;

        const next = Direction.goBack([r, c], direction);
        if (isOutOfRange(next) || map[next[0]][next[1]] === 1) return false;

        robot = [...next, direction];
        return true;
    }

    function isOutOfRange(point) {
        return point[0] < 0 || point[1] < 0 || point[0] === N || point[1] === M;
    }
}

class Direction {
    static NORTH = 0;
    static EAST = 1;
    static SOUTH = 2;
    static WEST = 3;

    static MOVE_NORTH = [-1, 0];
    static MOVE_EAST = [0, 1];
    static MOVE_SOUTH = [1, 0];
    static MOVE_WEST = [0, -1];

    static rotate(direction) {
        const turn = [
            Direction.WEST,
            Direction.NORTH,
            Direction.EAST,
            Direction.SOUTH,
        ];

        return turn[direction];
    }

    static go(point, direction) {
        const move = [
            Direction.MOVE_WEST,
            Direction.MOVE_NORTH,
            Direction.MOVE_EAST,
            Direction.MOVE_SOUTH,
        ];

        return [point[0] + move[direction][0], point[1] + move[direction][1]];
    }

    static goBack(point, direction) {
        const move = [
            Direction.MOVE_SOUTH,
            Direction.MOVE_WEST,
            Direction.MOVE_NORTH,
            Direction.MOVE_EAST,
        ];

        return [point[0] + move[direction][0], point[1] + move[direction][1]];
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
    const robot = data.shift().split(' ').map(Number);
    const map = data.map(row => row.split(' ').map(Number));
    return [N, M, robot, map];
}

/****** TEST CASE *******/

const TEST1 = `3 3
1 1 0
1 1 1
1 0 1
1 1 1`;

const TEST2 = `11 10
7 4 0
1 1 1 1 1 1 1 1 1 1
1 0 0 0 0 0 0 0 0 1
1 0 0 0 1 1 1 1 0 1
1 0 0 1 1 0 0 0 0 1
1 0 1 1 0 0 0 0 0 1
1 0 0 0 0 0 0 0 0 1
1 0 0 0 0 0 0 1 0 1
1 0 0 0 0 0 1 1 0 1
1 0 0 0 0 0 1 1 0 1
1 0 0 0 0 0 0 0 0 1
1 1 1 1 1 1 1 1 1 1`;

console.log(solution(...input(TEST1)));
console.log(solution(...input(TEST2)));
