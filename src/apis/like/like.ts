/* 
찜 가게 요청 API
1. 80% 확률로 성공하도록 세팅
2. 성공하면 true, 로컬스토리지에 likeIdx 배열로 저장
3. 실패하면 false
*/
export const postLikeStore = (id: string): Promise<boolean> => {
  return new Promise((res, rej) => {
    const isSuccess = Math.floor((Math.random() * 10) % 10) < 9; // 80%  확률로 성공
    const getLikeIds = JSON.parse(localStorage.getItem("like") as string) ?? [];
    const isExist = getLikeIds.includes(id);
    setTimeout(() => {
      if (isSuccess) {
        if (isExist) {
          return res(true);
        }
        // 로컬 스토리지에 storeIdx 배열값 저장
        // res(DUMMY_STORE_LIST);

        getLikeIds.push(id);
        console.log(getLikeIds);
        localStorage.setItem("like", JSON.stringify(getLikeIds));
        return res(true);
      } else {
        // rej(new Error());
        return rej(false);
      }
    }, 400);
  });
};

/* 
찜 가게 해제 요청 API
1. 80% 확률로 성공하도록 세팅
2. 성공하면 true, 로컬스토리지에서 likeIdx 배열에서 제거
3. 실패하면 false
*/
export const deleteLikeStore = (id: string): Promise<boolean> => {
  return new Promise((res, rej) => {
    const isSuccess = Math.floor((Math.random() * 10) % 10) < 9; // 80%  확률로 성공
    const getLikeIds = JSON.parse(localStorage.getItem("like") as string) ?? [];
    const isExist = getLikeIds.includes(id);

    setTimeout(() => {
      if (isSuccess) {
        if (!isExist) {
          return res(true);
        }
        // 로컬 스토리지에서 storeIdx 배열값 제거
        const updatedLikeIds = getLikeIds.filter(
          (likeId: string) => likeId !== id
        );
        localStorage.setItem("like", JSON.stringify(updatedLikeIds));
        return res(true);
      } else {
        return rej(false);
      }
    }, 400);
  });
};

/** 로컬 스토리지 좋아요 가게 Id 배열 반환 */
export const getLikeStoreList = (): Promise<string[]> => {
  return new Promise((res) => {
    const getLikeIds = JSON.parse(localStorage.getItem("like") as string) ?? [];
    setTimeout(() => {
      res(getLikeIds);
    }, 400);
  });
};
