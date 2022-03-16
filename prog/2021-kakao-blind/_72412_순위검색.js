/**
 * 조건을 만족하는 사람 중 코딩 테스트 점수를 X점 이상 받은 사람은 모두 몇 명인가?
 * 지원자는 지원서 작성 시, 4가지 항목을 반드시 선택한다.
 * - 개발언어, 직군, 경력, 소울푸드
 *
 * @param {*} info 지원자가 지원서에 입력한 4가지의 정보와 획득한 코딩테스트 점수를
 *                 하나의 문자열로 구성한 값의 배열 (1~50_000)
 * @param {*} query 개발팀이 궁금해하는 문의조건이 문자열 형태로 담긴 배열
 *                  만약, 특정 조건을 고려하지 않는다면 '-'표시 (1~100_000)
 * @returns 각 문의조건에 해당하는 사람들의 숫자를 순서대로 배열에 담아 반환
 */

function solution(info, query) {
    const applications = new Map();
    applications.scores = new Array(info.length).fill(0);

    info.map((applicant, id) =>
        applicant.split(' ').forEach((type, index) => {
            if (isScore(index)) {
                applications.scores[id] = +type;
                return;
            }
            applications.set(
                type,
                (applications.get(type) || new Set()).add(id),
            );
        }),
    );

    return query
        .map((query) => query.replace(/and /g, '').split(' '))
        .map(
            (query) =>
                query.reduce(
                    (applicants, type, index) => {
                        if (type === '-') return applicants;
                        if (isScore(index))
                            return applicants.filter(
                                (applicant) =>
                                    applications.scores[applicant] >= type,
                            );
                        return applicants.filter((applicant) =>
                            applications.get(type).has(applicant),
                        );
                    },
                    Array.from(Array(info.length), (_, idx) => idx),
                ).length,
        );
}

const isScore = (index) => index === 4;

console.log(
    solution(
        [
            'java backend junior pizza 150',
            'python frontend senior chicken 210',
            'python frontend senior chicken 150',
            'cpp backend senior pizza 260',
            'java backend junior chicken 80',
            'python backend senior chicken 50',
        ],
        [
            'java and backend and junior and pizza 100',
            'python and frontend and senior and chicken 200',
            'cpp and - and senior and pizza 250',
            '- and backend and senior and - 150',
            '- and - and - and chicken 100',
            '- and - and - and - 150',
        ],
    ),
);
