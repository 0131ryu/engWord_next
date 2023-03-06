import { IProjects } from "./type";

export const projects:IProjects[] = [
    {
        id: 1,
        title: 'Word',
        name: "1. Word에서 영단어 생성, 단어를 공부합시다!",
        description: `한국어 기초사전 API를 이용해 단어를 생성하고 수정, 삭제를
        하며 단어를 익혀봅시다. 생성한 단어들은 가운데 그래프에서, 어떤 타입으로 생성한
        것인지 확인 가능합니다.
        체크한 단어들은 게임(game)에서 다시 확인 가능합니다.`,
        image_path: "/word.png",
        path: "/word"
    },
    {
        id: 2,
        title: 'SNS',
        name: "2. SNS에서 다른 사람들과 교류합시다!",
        description: `외운 단어들을 갖고 문장을 만들거나, 나만의 기록을 남기고
        다른 사람들과 공유해봅시다. 다른 사람들의 게시글을 확인하고 북마크하면서
        영어공부를 하는데 원동력이 될 것입니다.`,
        image_path: "/sns.png",
        path: "/post"
    },
    {
        id: 3,
        title: 'Game',
        name: "3. Game에서 만든 단어로 공부합시다!",
        description: `Word에서 생성한 단어 중 체크박스로 클릭 시 체크된 단어 중
        랜덤으로 10개의 단어가 게임으로 생성됩니다. 이를 통해 매일 단어를 외우고
        점수를 확인하면서, 꾸준히 학습합시다.`,
        image_path: "/game.png",
        path: "/game"
    }
]