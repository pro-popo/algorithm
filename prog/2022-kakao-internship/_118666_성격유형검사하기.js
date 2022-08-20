/**
 * 나만의 카카오 성격 유형 검사지를 만들고자 한다.
 * 성격 유형 검사는 다음과 같이 4개 지표로 성격 유형을 구분한다.
 * 성격은 각 지표에서 두 유형 중 하나로 결정된다.
 *
 * [성격 유형]
 * - 1: R,T
 * - 2: C,F
 * - 3: J,M
 * - 4: A,N
 * 성격 유형은 총 16가지가 나올 수 있다.
 *
 * 검사지에는 총 n개의 질문이 있으며, 7개의 선택지가 있다.
 * - 선택지: 매우 비동의, 비동의, 약간 비동의, 모르겠음, 약간 동의, 동의, 매우 동의
 * - 점수: A3, A2, A1, 점수(X), B1, B2, B3
 * - 번호: 1, 2, 3, 4, 5, 6, 7
 * 이때, 질문에 따라 어떤 유형이 비동의 혹은 동의에 점수를 받는지 다르다.
 *
 * 검사 결과는 모든 질문의 성격 유형 점수를 더하여,
 * 각 지표에서 더 높은 점수를 받은 성격 유형이 검사자의 성격 유형이라고 판단한다.
 * 단, 하나의 지표에서 각 성격 유형 점수가 같다면, 사전 순으로 빠른 성격 유형을 선택한다.
 *
 * @param survey 질문마다 판단하는 지표 (1~1_000)
 * @param choices 검사자가 각 질문마다 선택한 선택지
 * @returns 검사자의 성격 유형 검사 결과
 */

function solution(survey, choices) {
    const personalityType = [
        ['R', 'T'],
        ['C', 'F'],
        ['J', 'M'],
        ['A', 'N'],
    ];
    const score = personalityType.flat().reduce((obj, type) => {
        obj[type] = 0;
        return obj;
    }, {});
    const questionScore = [3, 2, 1, 0, 1, 2, 3];

    survey.forEach((types, i) => {
        if (choices[i] <= 4) score[types[0]] += questionScore[choices[i] - 1];
        else score[types[1]] += questionScore[choices[i] - 1];
    });

    return personalityType
        .map(types =>
            score[types[0]] >= score[types[1]] ? types[0] : types[1],
        )
        .join('');
}

/****** TEST CASE *******/
console.log(solution(['AN', 'CF', 'MJ', 'RT', 'NA'], [5, 3, 2, 7, 5]));
