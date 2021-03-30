export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;

    this._userName = document.querySelector(this._nameSelector);
    this._userDescription = document.querySelector(this._descriptionSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };

    return this._userData;
  }

  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }
}
