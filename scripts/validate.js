import { FormValidator } from "../components/formValidator.js";
import { validationSettings } from "../utils/constants.js";

const formList = Array.from(document.querySelectorAll(".form"));

formList.forEach((formElement) => {
  const validator = new FormValidator(validationSettings, formElement);

  validator.enableValidation();
});
