export class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    this._avatarSelector = avatarSelector;

    this._userName = document.querySelector(this._nameSelector);
    this._userDescription = document.querySelector(this._descriptionSelector);
    this._userAvatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };

    return this._userData;
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._userAvatar.src = avatar;
  }
}
