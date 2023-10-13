export default class LocalStorageUtil {
  /**
   * key 값과 기본값을 받아서 처리
   * 제네릭으로 반환받는 데이터 타입을 지정
   * key 값에 해당하는 localStorage 값이 없는 경우에는 null 값을 반환함
   * defaultValue 값을 추가
   */
  static get<T>(key: string, defaultValue: T = null as any): T {
    try {
      const value = localStorage.getItem(key);
      if (value === null) {
        // 키에 대한 값이 로컬 스토리지에 없는 경우
        return defaultValue;
      }
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`에러 : ${key}:`, error);
      return defaultValue;
    }
  }

  static set(key: string, value: any): Boolean {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.error(`에러 : ${key}:`, error);
      return false;
    }
  }
}
