export class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._avatarSelector = avatarSelector;
    this._descriptionSelector = descriptionSelector;
    this._nameSelector = nameSelector;

    this._userAvatar = document.querySelector(this._avatarSelector);
    this._userDescription = document.querySelector(this._descriptionSelector);
    this._userName = document.querySelector(this._nameSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };

    return this._userData;
  }

  setUserInfo({ name, about, avatar }) {
    this._userAvatar.src = avatar;
    this._userName.textContent = name;
    this._userDescription.textContent = about;
  }
}
