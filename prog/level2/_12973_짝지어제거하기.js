/**
 * 짝지어 제거하기는 알파벳 소문자로 이루어진 문자열을 가지고 시작한다.
 * 먼저, 문자열에서 같은 알파벳이 2개 붙어 있는 짝을 찾는다.
 * 그 다음, 그 둘을 제거한 뒤 앞뒤로 문자열을 이어 붙인다.
 * 이 과정을 반복하여 문자열을 모두 제거한다면 짝지어 제거하기가 종료된다.
 * 
 * 이러한 짝지어 제거하기를 성공적으로 수행할 수 있으면 1, 아닌 경우는 0을 반환한다.
 * 
 * @param {string} s - 문자열 (~1,000,000)
 * @return - 짝지어 제거하기를 성공적으로 수행할 수 있는지에 대한 여부
 */

function solution(s) {
    while(s.length) {
        let isRemove = false;
        const arr = [...s];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] !== arr[i-1]) continue;

            arr[i] = "";
            arr[i - 1] = "";
            isRemove = true;
        }
        
        if (!isRemove) return 0;
        s = arr.join("");
    }

    return 1;
}

/****** TEST CASE *******/

console.log(solution("baabaa"))

