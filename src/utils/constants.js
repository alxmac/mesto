export const selectors = {
  avatarSelector: ".user__avatar",
  nameSelector: ".user__name",
  descriptionSelector: ".user__description",
  addPopupSelector: ".popup_type_add-form",
  editPopupSelector: ".popup_type_edit-form",
  previewPopupSelector: ".popup_type_preview-image",
};

export const validationSettings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit-button_disabled",
};

export const formList = Array.from(document.querySelectorAll(".form"));
export const addButton = document.querySelector(".user__button_type_add");
export const editButton = document.querySelector(".user__button_type_edit");
export const userNameInput = document.querySelector(
  ".form__input_el_user-name"
);
export const userDescriptionInput = document.querySelector(
  ".form__input_el_description"
);
