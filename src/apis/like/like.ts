/* 
가게 리스트 데이터 api
*/
export const getLikeStoreIdsData = (): Promise<string[]> => {
  return new Promise((res, rej) => {
    const success = Math.random() * 10; // 임시
    console.log("success", success);
    setTimeout(() => {
      if (success) {
        res(DUMMY_STORE_LIST);
      } else {
        rej(new Error());
      }
    }, 400);
  });
};
