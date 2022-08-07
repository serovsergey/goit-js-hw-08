import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

let formData = {}; //{ email: '', message: '' }

const restoreFormData = function () {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      formData = JSON.parse(storedData);
    }
    catch (err) {
      console.error(err.message)
    }
    inputsRef.forEach((el) => {
      if (formData[el.name])
        el.value = formData[el.name]
    })
  }
}

const updateFormData = function (name, value) {
  formData = { ...formData, [name]: value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

const onInput = throttle(function (evt) {
  if (![...inputsRef].includes(evt.target)) return;
  updateFormData(evt.target.name, evt.target.value)
}, 500);

const onSubmit = function (evt) {
  evt.preventDefault();
  console.log(formData);
  formRef.reset();
  localStorage.removeItem(STORAGE_KEY);
}

const formRef = document.querySelector(".feedback-form");
const inputsRef = formRef.querySelectorAll('input[name],textarea[name]');
formRef.addEventListener('input', onInput);
formRef.addEventListener('submit', onSubmit);

restoreFormData();