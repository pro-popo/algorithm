/**
 * 시험장은 하나의 이진 트리 형태로 연결되어 있다.
 * 시험장은 고유 번호(ID)와 응시자 수에 대한 정보를 가지고 있다.
 *
 * 안정적인 시험을 위해, 시험장에서 오는 트래픽을 k개의 그룹으로 나누어
 * 각 그룹별 서버로 분산시키기로 했다.
 * 시험장 사이를 연결한 간선들 중 k-1개를 끊어서 k개의 그룹으로 나누고자 한다.
 * 이때, 그룹별 최대 트래픽을 최소화하기 위해 가장 큰 그룹의 인원을 최소화시켜야 한다.
 *
 * @param {*} k 나눌 그룹의 수 (1 ~ 10_000)
 * @param {*} num 각 시험장의 응시자 수
 *                길이, 원소: 1 ~ 10_000
 * @param {*} links 시험장의 연결 상태
 *                  [왼쪽 자식 노드, 오른쪽 자식 노드]
 *                  노드가 없는 경우 -1이 담겨있다.
 * @returns 최소화된 최대 그룹의 인원
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 시험장의 연결 상태(links)를 순회하여 Tree를 형성한다.
 *   생성한 Tree에서 최상위 노드(root)를 찾는다. (부모 노드가 없는 노드)
 *
 *   그 다음, 최상위 노드를 시작으로 자식 노드를 순회하여,
 *   트리의 높이를 기준으로 노드를 분류한다. (형제 노드끼리 분리)
 *
 *   최소화된 최대 그룹의 인원을 찾기 위해, 이분탐색을 진행한다.
 *   이때 탐색의 기준은,
 *   "모든 그룹을 P명 이하의 응시자로 나눴을 때, 그룹의 수가 K를 넘지 않는가?"이다.
 *
 *   먼저 검색할 최대 응시자의 수(P)를 구한다.
 *   그 다음, 최대 응시자의 수(P)를 기준으로 P를 넘지 않게 그룹화를 진행한다.
 *   이때, 생성된 그룹의 수가 K개를 넘지 않는다면,
 *   해당 응시자의 수(P)로 K개의 그룹을 형성할 수 있음을 의미한다.
 *
 *   그룹화 과정은 다음과 같다.
 *   먼저 가장 하위의 노드부터 방문하여 최상위 노드까지 순회한다.
 *   노드 방문 시, 부모 노드(현재 노드)/왼쪽 자식 노드/오른쪽 자식 노드의 응시자 수를 가져온다.
 *   이때 왼쪽 자식 노드와 오른쪽 자식 노드의 응시자 수는, 아래의 그룹화 과정에서 누적한 응시자 수를 의미한다.
 *
 *   이를 활용하여, 그룹화하는 방법은 다음과 같이 세 가지가 존재한다.
 *   1. [부모 노드 + 왼쪽 자식 노드 + 오른쪽 자식 노드] => (한 개의 그룹)
 *   2. [부모 노드 + 두 자식노드 중 작은 노드, 두 자식노드 중 큰 노드] => (두 개의 그룹)
 *   3. [부모 노드, 왼쪽 자식 노드, 오른쪽 자식 노드] => (세 개의 그룹)
 *   1, 2, 3번 순으로, 최대 응시자의 수(P)를 넘지 않는 경우를 선택하여 그룹화를 진행한다.
 *   만약 세 가지 방법 모두 불가능 하다면, 해당 응시자의 수(P)로는 그룹화를 진행할 수 없음을 의미한다.
 *   그룹화 후, 해당 노드의 총 응시자의 수를 업데이트 해준다.
 *
 * - 최하위 노드부터 방문하는 방법은 위처럼 트리의 높이별로 노드를 분류해서 방문하는 것보다
 *   DFS가 더 효율적이다.
 *   그러나, JavaScript로 DFS를 진행할 경우,
 *   효율성 테스트 케이스(TC. 2번/4번/6번/9번)에서 런타임 에러가 발생한다. 😅
 *   이는, JavaScript 엔진의 호출 스택의 최대 크기를 넘어섰기 때문이다.
 *   동일한 로직으로 Java는 통과하지만, JavaScript는 런타임 에러가 발생한다.
 *
 *   만약 10_000개의 노드가 사향 트리를 구성할 때 DFS로 최하위 노드까지 탐색한다면,
 *   > RangeError: Maximum call stack size exceeded
 *   와 같은 에러가 발생한다.
 *   이는 아래의 마지막 테스트 케이스에서 확인해 볼 수 있다.
 *
 *   참고로, 자바스크립트 엔진마다 호출 스택의 최대 크기가 다르지만,
 *   조사한 결과로는 대략 10_000 ~ 60_000 크기이다.
 *
 * - 이번에 처음 알게된 사실은,
 *   위와 같이 최적화 문제를 결정 문제로 바꾸어 푸는 방식을
 *   "파라메트릭 서치(Parametric Search)"라고 부른다.
 *   즉, 문제 상황을 만족하는 특정 최솟값 및 최댓값을 구하는 문제(최적화 문제)를 결정 문제로 바꾸는 것이다.
 *
 *   위에서 주어진 최적화 문제는, "조건에 맞는 최소한의 최대 그룹의 크기는 얼마인가?"이다.
 *   이를 결정 문제로 변경하면, "최대 그룹의 크기가 P일때, 조건에 맞게 그룹화할 수 있는가?"가 된다.
 *   이렇게 변경한 결정 문제의 결과는 TRUE 혹은 FALSE로 나뉜다.
 *   따라서, 결정 문제로 P의 최댓값을 이진 탐색을 통해 찾을 수 있다.
 *   즉 결정 문제의 결과가 TRUE인 P의 최댓값을 구하면 된다.
 */

function solution(k, num, links) {
    const tree = createTree(num, links);
    const root = tree.find(node => !node.parent);
    const heights = calculateHeight(root);

    let [min, max] = [1, 1e9];
    let answer = -1;
    while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        if (isSuccessGrouping(mid)) {
            max = mid - 1;
            answer = mid;
            continue;
        }
        min = mid + 1;
    }

    return answer;

    function isSuccessGrouping(MAX_PEOPLE) {
        return countGroup(MAX_PEOPLE) <= k;
    }

    function countGroup(MAX_PEOPLE) {
        const people = [...num];
        let numberOfGroup = 0;
        heights.every(siblingNodes =>
            siblingNodes.every(node => {
                const [root, left, right] = [node, ...node.childs].map(node =>
                    node ? people[node.id] : 0,
                );

                const splitedGroups = [1, 2, 3].map(type =>
                    splitGroup([root, left, right], type),
                );

                const splitedGroup = splitedGroups.find(isPossibleGroup);

                if (splitedGroup) {
                    numberOfGroup += splitedGroup.length - 1;
                    people[node.id] = splitedGroup[0];
                    return true;
                }

                numberOfGroup = k;
            }),
        );
        return numberOfGroup + 1;

        function isPossibleGroup(group) {
            return group.every(people => people <= MAX_PEOPLE);
        }
    }
}

function splitGroup([root, left, right], type) {
    switch (type) {
        case 1:
            return [root + left + right];
        case 2:
            return [root + Math.min(left, right), Math.max(left, right)];
        case 3:
            return [root, left, right];
    }
}

function createTree(num, links) {
    const tree = Array.from(
        Array(num.length),
        (_, id) => new Node(id, num[id]),
    );

    links.forEach((childIds, rootId) => {
        const root = tree[rootId];
        const childs = childIds.map(child => tree[child]);

        root.setChilds(childs);
        childs.forEach(child => child && child.setParent(root));
    });

    return tree;
}

function calculateHeight(root) {
    const heights = [];

    const queue = [root];
    while (queue.length) {
        let size = queue.length;
        heights.push([]);
        while (size--) {
            const node = queue.shift();
            if (!node) continue;

            heights[heights.length - 1].push(node);
            queue.push(node.leftChild, node.rightChild);
        }
    }

    return heights.reverse();
}

class Node {
    parent = null;
    leftChild = null;
    rightChild = null;

    constructor(id) {
        this.id = id;
    }

    setParent(parent) {
        this.parent = parent;
    }

    setChilds(childs) {
        [this.leftChild, this.rightChild] = childs;
    }

    get childs() {
        return [this.leftChild, this.rightChild];
    }
}

/****** TEST CASE *******/

console.log(
    solution(
        3,
        [12, 30, 1, 8, 8, 6, 20, 7, 5, 10, 4, 1],
        [
            [-1, -1],
            [-1, -1],
            [-1, -1],
            [-1, -1],
            [8, 5],
            [2, 10],
            [3, 0],
            [6, 1],
            [11, -1],
            [7, 4],
            [-1, -1],
            [-1, -1],
        ],
    ),
);

console.log(
    solution(
        1,
        [6, 9, 7, 5],
        [
            [-1, -1],
            [-1, -1],
            [-1, 0],
            [2, 1],
        ],
    ),
);

console.log(
    solution(
        2,
        [6, 9, 7, 5],
        [
            [-1, -1],
            [-1, -1],
            [-1, 0],
            [2, 1],
        ],
    ),
);

console.log(
    solution(
        3,
        [100, 90, 7, 95, 93],
        [
            [-1, -1],
            [-1, 4],
            [-1, 0],
            [2, 1],
            [-1, -1],
        ],
    ),
);

const num = Array(10_000).fill(10_000);
const links = [...Array(10_000)].map((_, index) => [index + 1, -1]);
console.log(solution(10_000, num, links));
