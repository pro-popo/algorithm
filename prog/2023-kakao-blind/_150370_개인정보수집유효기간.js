/**
 * [문제]
 * - n개의 개인정보
 * - 각 약관마다 보관 유효기간 정해짐
 * - 오늘 날짜로 파기해야 할 개인정보 번호 구하기
 * - 모든 달은 28일까지 존재
 *
 * @param {string} today : 오늘 날짜
 * @param {string[]} terms : 약관의 유효기간 (1~20)
 * @param {string[]} privacies : 수집된 개인정보의 정보 (1~100)
 * @returns 파기해야 할 개인정보의 번호 (오름차순)
 *
 * ### 리뷰
 * - Map 객체와 Date 객체를 활용할 수 있다면 쉽게 풀 수 있는 문제였다.
 * - 모든 달이 28일까지 있다는 가정 덕분에 단순하게 날짜 계산이 가능했다.
 */

function solution(today, terms, privacies) {
    const mapTearms = new Map(terms.map(term => term.split(' ')));

    return privacies.reduce((answer, privacy, id) => {
        const [date, type] = privacy.split(' ');
        const period = +mapTearms.get(type);
        const expirationPeriod = calculateExpirationPeriod(date, period);

        if (isExpiredPrivacy(expirationPeriod, today)) {
            return [...answer, id + 1];
        }
        return answer;
    }, []);
}

const calculateExpirationPeriod = (date, period) => {
    const expirationPeriod = new Date(date);
    expirationPeriod.setMonth(expirationPeriod.getMonth() + period);
    return expirationPeriod;
};

const isExpiredPrivacy = (privacyDate, today) => {
    return new Date(today).getTime() >= privacyDate.getTime();
};

/** TEST CASE */
console.log(
    solution(
        '2022.05.19',
        ['A 6', 'B 12', 'C 3'],
        ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C'],
    ),
);

console.log(
    solution(
        '2020.01.01',
        ['Z 3', 'D 5'],
        [
            '2019.01.01 D',
            '2019.11.15 Z',
            '2019.08.02 D',
            '2019.07.01 D',
            '2018.12.28 Z',
        ],
    ),
);
