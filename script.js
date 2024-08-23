const inputElements = document.querySelectorAll(".card__input");
const submitButton = document.querySelector(".card__button");

const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};

const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};

const validateYear = (year) => {
  if (year && year <= new Date().getFullYear()) {
    return true;
  }
};

const dateValidation = (dayElement, monthElement, yearElement) => {
  let isValid = ["false", "false", "false"];
  if (!validateDay(dayElement.value)) {
    dayElement.classList.add("card__input--error");
  } else {
    dayElement.classList.remove("card__input--error");
    isValid[0] = true;
  }

  if (!validateMonth(monthElement.value)) {
    monthElement.classList.add("card__input--error");
  } else {
    monthElement.classList.remove("card__input--error");
    isValid[1] = true;
  }

  if (!validateYear(yearElement.value)) {
    yearElement.classList.add("card__input--error");
  } else {
    yearElement.classList.remove("card__input--error");
    isValid[2] = true;
  }

  return isValid.every((item) => item === true);
};

const calculateAge = function (year, month, day) {
  const today = new Date();
  const birthday = new Date(year, month - 1, day);

  let ageYear = today.getFullYear() - birthday.getFullYear();
  let ageMonth = today.getMonth() - birthday.getMonth();
  let ageDay = today.getDate() - birthday.getDate();

  if (ageDay < 0) {
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      0
    ).getDate();
    ageDay += lastMonth;
    ageMonth--;
  }

  if (ageMonth < 0) {
    ageYear--;
    ageMonth += 12;
  }

  if (ageMonth === 0 && ageDay === 0) {
    return `${ageYear} years`;
  }

  return `${ageYear} years , ${ageMonth} Months , ${ageDay} days`;
};

const onclickHandler = () => {
  const resultValue = document.querySelector(".card__resultValue");
  const yearElement = document.getElementById("year");
  const monthElement = document.getElementById("month");
  const dayElement = document.getElementById("day");

  if (!dateValidation(dayElement, monthElement, yearElement)) {
    resultValue.textContent = "--";
    return;
  }
  resultValue.textContent = calculateAge(
    yearElement.value,
    monthElement.value,
    dayElement.value
  );
};

inputElements.forEach((input) => {
  input.addEventListener(
    "keydown",
    (e) => e.key === "Enter" && onclickHandler()
  );
});

submitButton.addEventListener("click", onclickHandler);
