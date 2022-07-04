/**
 * 상근이는 문자열에 폭발 문자열을 심어 놓았다.
 * 폭발 문자열이 폭발하면 그 문자는 문자열에서 사라지며, 남은 문자열을 합쳐지게 된다.
 *
 * 폭발은 다음과 같은 과정으로 진행된다.
 * - 문자열이 폭발 문자열을 포함하고 있는 경우,
 *   모든 폭발 문자열이 폭발하며 남은 문자열을 순서대로 이어붙인다.
 * - 새로 생긴 문자열에 폭발 문자열이 포함되어 있는 경우가 있다.
 * - 모든 폭발 문자열이 없어질 때까지 위 과정을 반복한다.
 *
 * 상근이는 모든 폭발이 끝난 후 어떤 문자열이 남는지 구하고자 한다.
 * 남아있는 문자가 없는 경우, "FRULA"를 출력한다.
 *
 * @param {string} string - 문자열 (1~1,000,000)
 * @param {string} explosion - 폭발 문자열 (1~36)
 */

function solution(string, explosionString) {
    const regExp = new RegExp(explosionString, 'g');
    while (string.search(regExp) >= 0) {
        string = string.replace(regExp, '');
    }
    return string || 'FRULA';
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    return data;
}

/****** TEST CASE *******/

const TEST1 = `mirkovC4nizCC44
C4`;
const TEST2 = `12ab112ab2ab
12ab`;

console.log(solution(...input(TEST1)));
console.log(solution(...input(TEST2)));
