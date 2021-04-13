export const authToken = "b840dc47-080d-4028-b958-7f9f9e1effeb";
export const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-22";

export const selectors = {
  cardsSelector: ".cards",
  avatarSelector: ".user__avatar",
  nameSelector: ".user__name",
  descriptionSelector: ".user__description",
  addPopupSelector: ".popup_type_add-form",
  confirmationPopupSelector: ".popup_type_confirmation",
  editPopupSelector: ".popup_type_edit-form",
  previewPopupSelector: ".popup_type_preview-image",
  updatePopupSelector: ".popup_type_update-form",
};

export const validationSettings = {
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__submit-button",
};

export const addButton = document.querySelector(".user__button_type_add");
export const editButton = document.querySelector(".user__button_type_edit");
export const updateButton = document.querySelector(".user__button_type_update");

export const userNameInput = document.querySelector(
  ".form__input_el_user-name"
);
export const userDescriptionInput = document.querySelector(
  ".form__input_el_description"
);

export const addForm = document.getElementById("add");
export const editForm = document.getElementById("edit");
export const updateForm = document.getElementById("update");
