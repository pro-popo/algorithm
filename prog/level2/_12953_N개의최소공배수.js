/**
 * 두 수의 최소공배수란, 공통이 되는 가장 작은 숫자를 의미한다.
 * 예로, 2와 7의 최소공배수는 14가 된다.
 * 정의를 확장해서, n개의 수의 최소공배수는 n개의 수들의 배수 중 공통이 되는 가장 작은 숫자가 된다.
 *
 * @param {number[]} arr - n개의 숫자를 담은 배열
 *                         길이: 1~15, 원소: 100이하
 * @returns n개의 수들의 최소공배수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   [a,b,c] 배열의 최소공배수는 다음과 같은 원리로 구할 수 있다.
 *   a와 b의 최소공배수가 X이고,
 *   X와 c의 최소공배수가 Y이라면,
 *   Y는 a,b,c의 최소공배수가 된다.
 *
 *   이러한 원리를 통해 위 문제를 해결할 수 있다.
 *   arr를 순회하여, arr[i]와 arr[i-1]의 최소공배수 X를 구한다.
 *   그 다음에는 X와 arr[i+1]의 최소공배수를 구한다.
 *   위 과정을 반복하여 순회를 마친 뒤에는,
 *   최종적으로 n개의 수들의 최소공배수를 구할 수 있다.
 *
 * - 다른 풀이 방식으로는,
 *   두 수의 최소공배수를 계산할 때 다음과 같은 공식을 활용할 수 있다.
 *   > 최소공배수 = 두 수의 곱 / 두 수의 최대공약수
 *
 *   이때 최대공약수는 "유클리드 호제법(Euclidean, gcd)"으로 구할 수 있다.
 *   a를 b로 나눈 나머지를 X이라고 할 때, (단, a<b)
 *   a와 b의 최대공약수는 b와 X의 최대공약수와 같다.
 *   그 다음, b와 X의 나머지가 Y일 때, X와 Y의 최대공약수를 구한다.
 *   위 과정에서 나머지가 0이 될때까지 반복한다.
 *   [EX] (1017, 1029) = (1029, 42) = (42, 21) = (21, 0) = 21
 */

function solution(arr) {
    return arr.reduce(findleastCommonMultiple);
}

function findleastCommonMultiple(a, b) {
    for (let i = 1; i <= a * b; i++) {
        const multiple = i * a;
        if (multiple % b === 0) return multiple;
    }
}

/****** TEST CASE *******/

console.log(solution([2, 6, 8, 14]));
console.log(solution([1, 2, 3]));

/*eslint no-unused-vars: "off" */
/**
 * 유클리드 호제법(gcd)
 *
 * @param {number} a - 정수 a
 * @param {number} b - 정수 b
 * @returns {number} - 두 수의 최대공약수
 */

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}
