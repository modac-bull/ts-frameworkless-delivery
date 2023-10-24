import foodOptionsStyle from "./foodOption.scss";

const foodOptionTemplate = `
<div class=${foodOptionsStyle["food-option-container"]}>
  <div class=${foodOptionsStyle["form-label"]} id='price-option'>
    <input  name={{id}} value={{price}} id={{id}} type='checkbox' class=${foodOptionsStyle["checkbox-st1"]}/>
    <label for={{id}}>{{title}}</label>
  </div>
  <p class=${foodOptionsStyle["text-price"]}>+{{price}}원</p>
</div>`;

export default foodOptionTemplate;
