import moment from 'moment';
import * as filterFunctions from './filterFunctions';

const usersMock = [
  {
    dateAdded: moment('10-20-2017', 'MM-DD-YYYY'),
    hospitalId: 1,
    age: 20,
    sex: 'male',
  },
  {
    dateAdded: moment('10-21-2017', 'MM-DD-YYYY'),
    hospitalId: 2,
    age: 25,
    sex: 'female',
  },
  {
    dateAdded: moment('10-22-2017', 'MM-DD-YYYY'),
    hospitalId: 2,
    age: 55,
    sex: 'male',
  },
  {
    dateAdded: moment('10-22-2017', 'MM-DD-YYYY'),
    hospitalId: 1,
    age: 15,
    sex: 'female',
  },
  {
    dateAdded: moment('10-25-2017', 'MM-DD-YYYY'),
    hospitalId: 1,
    age: 20,
    sex: 'male',
  },
];

describe('filter functions', () => {
  it('should test filter users by date', () => {
    const dateRange = {
      start: moment('10-22-2017', 'MM-DD-YYYY'),
      end: moment('10-25-2017', 'MM-DD-YYYY'),
    };
    expect(filterFunctions.filterUsersByDate(dateRange, usersMock)).toHaveLength(3);
  });

  it('should test filter users by hospital id', () => {
    const hospitals = [{ hospitalId: 1 }];
    expect(filterFunctions.filterUsersByHospitalId(hospitals, usersMock)).toHaveLength(3);
  });

  it('should test get user statistics', () => {
    const userStatistics = filterFunctions.getUserStatistics(usersMock);
    expect(userStatistics).toHaveProperty('ageStats');
    expect(userStatistics).toHaveProperty('genderStats');
    expect(userStatistics).toEqual({
      ageStats: [
        {
          label: '<18',
          value: 1,
          percentage: 20,
        },
        {
          label: '25-50',
          value: 1,
          percentage: 20,
        },
        {
          label: '>50',
          value: 1,
          percentage: 20,
        },
        {
          label: 'na',
          value: 0,
          percentage: 0,
        },
      ],
      genderStats: [
        {
          label: 'M',
          value: 3,
          percentage: 60,
        },
        {
          label: 'F',
          value: 2,
          percentage: 40,
        },
      ],
    });
  });
});
