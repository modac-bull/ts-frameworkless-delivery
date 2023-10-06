export default class LocalStorageUtil {
  /**
   * key 값과 기본값을 받아서 처리
   * 제네릭으로 반환받는 데이터 타입을 지정
   */
  static get<T>(key: string, defaultValue: T = null as any): T {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value as string) || defaultValue;
    } catch (error) {
      console.error(`에러 : ${key}:`, error);
      return defaultValue;
    }
  }

  static set(key: string, value: any): void {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`에러 : ${key}:`, error);
    }
  }
}
