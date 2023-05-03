# ⭐ engWord_next 프로젝트 요약

## ⭐ 배포 주소
###  ▶[engword_next 사이트 주소](https://engword.shop) 
###  ▶[backend 주소](https://api.engword.shop)
&nbsp;
## ⭐ 사용된 것들 
### ▶ front : next.js, javascript, typescript, redux, open API
### ▶ back : node.js, express, aws(aws-sdk), s3, lambda

&nbsp;
## ▶ Next.js와 AWS 배포
#### 🌕 SSR 적용 →  브라우저 접속 시 한 번에 정보를 가져오며 속도 향상
#### 🌕 S3 + Lambda 이미지 크기 감소 (MB → KB), 이미지 렌더링 속도 향상
#### 🌕 Lighthouse 성능 증가(84 → 96), 접근성 증가(74 → 93)

&nbsp;  
## ▶ 추가된 기능
### ⭐ [영어단어장 version2.0 github](https://github.com/0131ryu/engWord)와 무엇이 다른가?
#### 🌕 `Home` : 영단어 생성 및 수정 및 [오픈 API](https://krdict.korean.go.kr/openApi/openApiInfo) 사용
#### 🌕 `SNS` : 사용자가 이용가능한 SNS(트위터처럼 포스팅 작성, 팔로잉과 언팔로잉, 검색 가능)
#### 🌕 `Game` : `Home`에서 만든 영단어로 10개를 랜덤으로 지정해 게임처럼 진행
#### 🌕 `Profile` : 사용자가 작성한 게시글, 단어 수, 게임에서 맞춘 단어 수, 팔로잉, 팔로워, 차단 여부 확인 가능

&nbsp;
&nbsp;

## ⭐  [프로젝트 정리 블로그](https://velog.io/@131ryuji/series/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%98%81%EB%8B%A8%EC%96%B4-SNS-%EA%B2%8C%EC%9E%84-%ED%8F%AC%ED%95%A8)

&nbsp;
&nbsp;




### [API 정리 문서](https://app.gitbook.com/o/XjQnIMaCjPRpB3WKV43I/s/TebqwzYidVWF2nE0Diey) 

### <추가사항>
▶ 일부 javascript를 typescript로 변환(redux, quote)

▶ 무료 인용문 API(Quote) 사용해 추천 영어 문장 랜덤으로 보여줌


#### 1. `[Home, Game]` [한국어 기초사전 API](https://krdict.korean.go.kr/openApi/openApiInfo) 사용

▶ 단어 생성 시 `API`를 통해 검색 후 단어 생성 가능 

▶ 만든 영단어로 게임 진행 시 모르는 단어를 `API` 기반으로 검색

![01](https://user-images.githubusercontent.com/89256977/224272624-a4284406-9642-4502-9233-5e7a974e72b3.png)


#### 2. `[Home]` 영단어 체크박스의 경우 Home에서 체크 시 Game에서도 확인 가능(반대도 마찬가지)

▶ 개별적으로 동작이 아닌, 서로 연결되었음을 보여주기 위함
![02](https://user-images.githubusercontent.com/89256977/224272734-79b2ee3b-b82e-4d2e-b1b3-6f80e782e5bf.png)
![02-1](https://user-images.githubusercontent.com/89256977/224272966-9d666fe6-baf0-45ff-af74-462fee516dc6.png)

#### 3. `[Game]` 체크박스를 기반으로 단어가 랜덤하게 문제 생성, 게임처럼 동작함

▶ 랜덤한 영단어를 문제에서 보여줄 때 서로 겹치지 않음 

▶ 문제는 `Home`에서 생성한 단어의 영어, 해답은 `Home`에서 생성한 한글 뜻임

▶ 게임은 각 문제마다 `12초`씩 시간제한이 있으며, 이를 초과 시 초과하는 알림(`Modal`)이 뜸

▶ 10문제를 모두 푼 경우 모두 풀었다는 알림(`Modal`)이 뜸

▶ 문제를 모두 푼 경우와 모두 풀지 못한 경우 결과는 저장되며(저장하지 않을 경우 페이지 이동 불가) 
이 결과는 `Profile`에서 확인 가능

![03](https://user-images.githubusercontent.com/89256977/224273089-ab63986f-5dc7-47d5-bd5d-34373b432745.png)
![03-1](https://user-images.githubusercontent.com/89256977/224273110-0165b56a-40c9-4108-a236-cf4d905f4d3e.png)
![03-2](https://user-images.githubusercontent.com/89256977/224273126-72b81904-bbd3-44c6-8ad4-12f49e17970d.png)


#### 4. [Home, SNS, Profile] `Chartjs`를 이용해 그래프 보여줌

▶ Home의 경우 단어가 생성, 수정, 삭제같은 변화가 있을 때 각 타입(`easy`, `middle`, `advance`)에 따라 변화하는 모습 보여줌

▶ SNS의 경우 Home에서 생성한 단어 작성 개수를 보여줌(일주일 단위)

▶ Profile의 경우 Game에서 진행한 결과를 차트로 보여줌(일일 단위)

![04-1](https://user-images.githubusercontent.com/89256977/224273242-d78d2b21-81d4-4f5c-a688-caad1bee5399.png)
![04-2](https://user-images.githubusercontent.com/89256977/224273262-7fd90ca8-9387-4aa0-8292-38aaf1384687.png)
![04-3](https://user-images.githubusercontent.com/89256977/224273272-78b5f393-9042-4233-b689-5246a3e1bb72.png)



#### 5. `[SNS]` 팔로잉, 언팔로잉 이외에 차단기능 추가

▶ 차단당한 사람은 차단한 사람의 글을 볼 수 없음

![05-1](https://user-images.githubusercontent.com/89256977/224273461-9e5d8a9f-d980-4695-88e1-268d9fee3b18.png)
![05-2](https://user-images.githubusercontent.com/89256977/224273483-ef588c61-5b90-435b-b530-b4b4cfe597bc.png)
![05-3](https://user-images.githubusercontent.com/89256977/224273496-362ee51b-1314-4146-9a02-4aba4ef5687f.png)
![05-4](https://user-images.githubusercontent.com/89256977/224273673-5df29c45-ebcb-42f0-a93a-fe87971d9a83.png)


####  6. `[SNS]` 리트윗 기능 추가 

▶ 본인이 작성한 글을 리트윗 할 수 없으며 한 번 리트윗한 글은 중복으로 리트윗 불가

![06](https://user-images.githubusercontent.com/89256977/224273731-f9e9ec14-bc3c-44e1-9a0a-36990bfec3a2.png)


#### 7. `[SNS]` 좋아요, 북마크 버튼 추가

▶ 좋아요 버튼(하트모양)은 여러 사람이 누를수록 숫자 증가(누르고 해제 가능)

▶ 북마크 기능은 북마크 버튼을 눌렀을 때 왼쪽 상단 `내가 북마크한 글`에서 확인 가능(누르고 해제 가능)


![07-1](https://user-images.githubusercontent.com/89256977/224273862-d6eb69e6-1837-4cea-8ad6-980b77fede26.png)
![07-2](https://user-images.githubusercontent.com/89256977/224273871-196a4efa-9418-4b40-8a3a-2841e53cb8d3.png)

#### 8. `[SNS]` 태그 검색(#) 및 게시글로 검색 가능

▶ 게시글 내용은 태그 검색과 중복되서 결과가 나옴 

ex) 게시글 #게시글 작성한 글이 있다면 둘 다 검색이 나옴

![08](https://user-images.githubusercontent.com/89256977/224273923-4310e23d-dc55-4705-aec5-4f2cedaa113d.png)
![08-1](https://user-images.githubusercontent.com/89256977/224273935-3388e8b3-4270-4096-a08c-c8837c9db903.png)

####  9. `[SNS]` 여러 이미지 사진의 경우 각 누른 사진마다 크게 이미지 보여짐

▶ 이미지는 `AWS S3`에 저장함

▶ 이미지 슬라이더(오른쪽(>)과 왼쪽(<) 버튼 클릭 시 움직임) 추가

▶ 각 처음 이미지와 마지막 이미지의 경우 오른쪽과 왼쪽 버튼이 눌려도 비활성화 됨

![09](https://user-images.githubusercontent.com/89256977/224274066-41666556-836d-4a64-8d0b-976e8492eff8.png)
![09-1](https://user-images.githubusercontent.com/89256977/224274071-11ec7662-9fcb-47b6-a9b1-9ef516d09506.png)


#### 10. `[SNS, Profile]` 이미지 추가 시 유저 프로필 사진도 변경

▶ 프로필 지정 전에는 기존 이미지로 유지되다가 변경 시 변경 이미지로 유지됨

▶ 유저 프로필 사진을 상단 유저 아이콘 클릭 시 `https://engword.shop//profile`내 프로필 변경에서 변경함

▶ 프로필 변경 후 SNS 내 게시글에서도 변경된 모습을 확인 가능

![10](https://user-images.githubusercontent.com/89256977/224274115-c221fb08-d6e1-4b77-8d15-4d2312fc311a.png)
![10-1](https://user-images.githubusercontent.com/89256977/224274152-b168ccfc-1633-4989-acbf-ecf9f4cdb2d5.png)
![10-2](https://user-images.githubusercontent.com/89256977/224274170-57dd061b-be02-4174-a2db-c8670a9d5d9e.png)
