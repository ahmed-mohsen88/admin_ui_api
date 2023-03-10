// search by name
export const searchByName = (usersSelector, searchInput) => {
  return usersSelector.filter((filteredProfile) => {
    return (
      filteredProfile?.name.toLowerCase().match(searchInput.toLowerCase()) ||
      filteredProfile?.email.toLowerCase().match(searchInput.toLowerCase()) ||
      filteredProfile?.role.toLowerCase().match(searchInput.toLowerCase())
    );
  });
};

// edit Filter
export const editFilter = (usersSelector, compareValue2) => {
  return usersSelector?.filter((filteredProfile) => {
    return filteredProfile.email === compareValue2;
  });
};

// filter if two value not equal
export const filterNotEqual = (usersSelector, name, compareValue2) => {
  return usersSelector.filter((filteredProfile) => {
    return filteredProfile[name] !== compareValue2;
  });
};

// check box checker
export const checkBoxChecker = (checkedState, index) => {
  return checkedState.map((el, ind) => {
    if (index === ind) {
      if (el === true) {
        return (el = false);
      } else {
        return (el = true);
      }
    } else {
      return el;
    }
  });
};

// get admin or member count
export const getCount = (usersSelector, value1, value2) => {
  return usersSelector.filter((el) => {
    return el[`${value1}`] === value2;
  }).length;
};

// filter delete all by check box
export const deleteAll = (newHomeProf, checkedState) => {
  // array contain deleted items
  const arr = [];
  newHomeProf.forEach((prof, index) => {
    checkedState.forEach((ch, ind) => {
      if (ch === true && ind === index) {
        arr.push(prof);
      }
    });
  });
  return arr;
};
