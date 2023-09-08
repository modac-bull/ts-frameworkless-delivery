export default (container: Element) => {
  const home = () => {
    container.textContent = "메인 페이지!";
  };

  const store = () => {
    container.textContent = "페이지 없음!";
  };

  const food = async (params: string) => {
    console.log(params);
    container.textContent = "페이지 없음!";
  };

  const notFound = () => {
    container.textContent = "페이지 없음!";
  };

  return {
    home,
    store,
    food,
    notFound,
  };
};
