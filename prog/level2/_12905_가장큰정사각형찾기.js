/**
 * 1와 0로 채워진 표가 있다.
 * 이때 1로 이루어진 가장 큰 정사각형의 넓이를 구하고자 한다.
 *
 * @param {number[]} board - 표 (1~1_000)
 * @returns {number} 가장 큰 정사각형의 넓이
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   DP를 활용하여 현재 위치에서 가능한 최대 크기의 정사각형의 한 변의 길이를 구할 수 있다.
 *
 *   먼저 [1, 1]부터 board를 순회한다.
 *   이때 현재 위치에서 가능한 최대 크기의 정사각형의 한 변의 길이는 다음과 같이 구할 수 있다.
 *   - 현재 위치를 기준으로 왼쪽(r,c-1), 위쪽(r-1,c), 대각선(r-1, c-1) 위치 중 가장 작은 값을 찾는다.
 *   - 그리고 가장 작은 값 + 1인 값을 해당 위치에 저장한다.
 *   즉, dp[r][c] = Math.min(dp[r][c-1], dp[r-1][c], dp[r-1][c-1]) + 1이다.
 *
 *   아래 예제의 경우,
 *   0 1 1 1
 *   1 1 1 1
 *   1 1 1 1
 *
 *   다음과 같은 과정으로 정답을 구할 수 있다.
 *   0 1 1 1    0 1 1 1    0 1 1 1    0 1 1 1    0 1 1 1    0 1 1 1
 *   1 1 0 0    1 1 2 0    1 1 2 2    1 1 2 2    1 1 2 2    1 1 2 2
 *   1 0 0 0    1 0 0 0    1 0 0 0    1 2 0 0    1 2 2 0    1 2 2 3
 *
 *   순회를 마친 뒤, dp에서 가장 큰 숫자를 반환하면 된다.
 *
 * - 처음에는, board를 순회하여 1인 경우 해당 위치에서 오른쪽으로 순회하여 최대 가로 길이를 구했다.
 *   그 다음 해당 가로 길이의 정사각형이 존재하는지 확인했다.
 *   위 방식은 시간초과가 발생한 것도 있지만,
 *   1 1 1 1
 *   1 1 0 0
 *   와 같은 케이스에서 반례가 나타난다.
 *   정답은 2이지만, 위의 풀이 방식으로는 1이 나타난다.
 *
 *   두 번째로는, 이분탐색을 진행하여 해당 변의 길이를 가진 정사각형이 존재하는지 확인했다.
 *   그러나 첫 번째 방식과 마찬가지로 시간초과가 발생했다. 😂
 *
 *   결국 다른 풀이를 참고하여 풀었다! 🤗
 */

function solution(board) {
    const [ROW, COLUMN] = [board.length, board[0].length];

    let maxWidth = board[0][0];
    for (let r = 1; r < ROW; r++) {
        for (let c = 1; c < COLUMN; c++) {
            if (board[r][c] === 0) continue;

            board[r][c] =
                Math.min(
                    board[r][c - 1],
                    board[r - 1][c],
                    board[r - 1][c - 1],
                ) + 1;
            maxWidth = Math.max(maxWidth, board[r][c]);
        }
    }
    return maxWidth * maxWidth;
}

/****** TEST CASE *******/

console.log(
    solution([
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 0, 1, 0],
    ]),
);

console.log(solution([[1]]));
