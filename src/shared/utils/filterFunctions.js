import toNumber from 'lodash/toNumber';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';

/**
 * Filter users by date range
 * @param dateRange - {start: Date, end: Date}
 * @param users - array of users
 * @returns {Array.<Object>} - filtered array of users
 */
export function filterUsersByDate(dateRange, users) {
  return users.filter(user => !isUndefined(user.dateAdded) &&
    moment(user.dateAdded).isSameOrAfter(dateRange.start)
    && moment(user.dateAdded).isSameOrBefore(dateRange.end));
}

/**
 * Filter users by date range
 * @param hospitals - {array}
 * @param users - array of users
 * @returns {Array.<Object>} - filtered array of users
 */
export function filterUsersByHospitalId(hospitals, users) {
  return users.filter(user => hospitals.some(hospital =>
    hospital.hospitalId === toNumber(user.hospitalId)));
}

/**
 * get user statistics: {ageStats, genderStats}
 * @param users
 * @returns {{ageStats: [null,null,null,null], genderStats: [null,null]}}
 */
export function getUserStatistics(users) {
  const getPercent = (value) => {
    if (users.length && value) {
      return Math.round((value / users.length) * 100);
    }
    return 0;
  };

  const ageValues = [
    {
      value: '<18',
      filterFunction: user => user.age < 18,
    },
    {
      value: '25-50',
      filterFunction: user => user.age >= 25 && user.age < 50,
    },
    {
      value: '>50',
      filterFunction: user => user.age > 50,
    },
    {
      value: 'na',
      filterFunction: user => isUndefined(user.age),
    },
  ];
  const genderValues = [
    {
      value: 'M',
      filterFunction: user => user.sex === 'male',
    },
    {
      value: 'F',
      filterFunction: user => user.sex === 'female',
    }];

  return {
    ageStats: ageValues.map((age) => {
      const value = users.filter(user => user.age === age.value || age.filterFunction(user)).length;
      return {
        label: age.value,
        value,
        percentage: getPercent(value),
      };
    }),
    genderStats: genderValues.map((gender) => {
      const value = users.filter(user => gender.filterFunction(user)).length;
      return {
        label: gender.value,
        value,
        percentage: getPercent(value),
      };
    }),
  };
}
