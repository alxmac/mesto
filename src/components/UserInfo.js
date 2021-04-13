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
      avatar: this._userAvatar.src,
      description: this._userDescription.textContent,
      name: this._userName.textContent,
    };

    return this._userData;
  }

  setUserInfo({ about, avatar, name }) {
    about && (this._userDescription.textContent = about);
    avatar && (this._userAvatar.src = avatar);
    name && (this._userName.textContent = name);
  }
}
