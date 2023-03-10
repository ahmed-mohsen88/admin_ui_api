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
