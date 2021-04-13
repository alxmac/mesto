export const renderLoading = (submitButton) =>
  (submitButton.value = "Coхранение ...");

export const finishLoading = (submitButton, initialValue) =>
  (submitButton.value = initialValue);
