/**
 * 하노이 탑은 퍼즐의 일종이다.
 * 다양한 크기의 원판들과 세 개의 기둥이 존재한다.
 * 한 기둥에 원판들이 큰 순으로 순서대로 쌓여있다.
 *
 * 다음 두 가지 조건을 만족시키면서, 다른 기둥으로 옮겨서 쌓고자 한다.
 * 1. 한 번에 하나의 원판만 옮길 수 있다.
 * 2. 큰 원판이 작은 원판 위에 있어서는 안된다.
 *
 * 1번,2번,3번 기둥이 존재한다.
 * 1번에는 n개의 원판이 있고,
 * 이 n개의 원판을 3번 원판으로 최소 횟수로 옮기고자 한다.
 *
 * @param {number} n - 원판의 개수 (~15)
 * @returns {number[][]} - 3번 원판으로 최소로 옮기는 방법
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   큰 원반부터 순서대로 도착(3번)기둥으로 옮겨야한다.
 *   i번째 원반을 도착기둥으로 옮기기 위해
 *   i-1번째 원반들을 다른 기둥으로 전부 옮긴다.
 *   그 다음 i번째 원반을 도착기둥으로 옮긴다.
 *   모든 원반들을 도착기둥으로 옮길 때까지 위 과정을 재귀로 반복한다.
 *
 * - 재귀 알고리즘 활용 문제로 유명한 문제이다.
 *   단순히 코드로는 이해가 안 돼서 열심히 그림 그려서 풀었다. 😂
 */

function solution(n) {
    const route = [];
    hanoi(n, 1, 2, 3);
    return route;

    function hanoi(number, from, by, to) {
        if (number === 1) {
            move(from, to);
            return;
        }
        hanoi(number - 1, from, to, by);
        move(from, to);
        hanoi(number - 1, by, from, to);
    }

    function move(from, to) {
        route.push([from, to]);
    }
}

/****** TEST CASE *******/

console.log(solution(2));
