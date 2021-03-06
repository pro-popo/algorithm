/**
 * 야근을 하면 야근 피로도가 쌓인다.
 * 야근 피로도는 야근을 시작한 시점에서 남은 일의 작업량을 제곱하여 더한 값이다.
 * N시간 동안 야근 피로도를 최소화하도록 일하고자 한다.
 * 1시간 동안 작업량 1만큼을 처리할 수 있다고 할 때,
 * 야근 피로도를 최소화한 값을 구하자.
 *
 * @param {number} n - 남은 시간 (1_000_000)
 * @param {number[]} works - 각 일에 대한 작업량 (1~20_000)
 * @returns - 야근 피로도를 최소화한 값
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   현재 존재하는 가장 큰 작업량을 기준으로,
 *   동일한 작업량을 가진 일을 1만큼 처리하는 과정을 반복한다.
 *
 *   먼저 works를 내림차순으로 정렬한다.
 *   works를 순회하여 가장 큰 작업량(works[0])을 기준으로,
 *   가장 큰 작업량과 동일한 일의 작업량 1만큼을 처리한다.
 *   만약 현재 작업량이 더 작은 경우, 순회를 종료한다.
 *   n을 전부 사용할 때까지 위 과정을 반복한다.
 *
 * - 처음에는,
 *   이분탐색을 통해 기준이 되는 작업량을 구했다.
 *   기준이 되는 작업량보다 큰 작업량을 처리했을 때, 필요한 시간이 n보다 동일하거나 작은 경우를 찾는다.
 *   최적의 작업량을 찾았다면, works를 최적의 작업량에 맞게 일을 처리한 다음,
 *   남아있는 n이 존재한다면 큰 작업량부터 차례대로 작업량을 1만큼 처리한다.
 *   시간초과 없이 잘 통과하지만, 첫 번째 풀이 방식이 좀 더 깔끔하다고 판단하여 수정하였다!
 */

function solution(n, works) {
    works.sort((a, b) => b - a);

    while (n > 0 && works[0] > 0) {
        const max = works[0];
        for (let i = 0; i < works.length; i++) {
            if (works[i] < max || n === 0) break;
            works[i]--;
            n--;
        }
    }

    return works.reduce((sum, number) => sum + number ** 2, 0);
}

/****** TEST CASE *******/

console.log(solution(4, [4, 3, 3]));
console.log(solution(1, [2, 1, 2]));
console.log(solution(3, [1, 1]));
