const emailRule =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const passwordRule = /^[A-Za-z0-9]{6,12}$/;
const nicknameRule = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,}$/;
export { emailRule, passwordRule, nicknameRule };
