import moment from 'moment';
import * as filterFunctions from './filterFunctions';

const usersMock = [
  {
    dateAdded: moment('10-20-2017', 'MM-DD-YYYY'),
    hospitalId: 1,
    age: 20,
  },
  {
    dateAdded: moment('10-21-2017', 'MM-DD-YYYY'),
    hospitalId: 2,
    age: 25,
  },
  {
    dateAdded: moment('10-22-2017', 'MM-DD-YYYY'),
    hospitalId: 2,
    age: 55,
  },
  {
    dateAdded: moment('10-22-2017', 'MM-DD-YYYY'),
    hospitalId: 1,
    age: 15,
  },
  {
    dateAdded: moment('10-25-2017', 'MM-DD-YYYY'),
    hospitalId: 1,
    age: 20,
  },
];

describe('filter functions', () => {
  it('should test filter users by date', () => {
    const dateRange = {
      start: moment('10-22-2017', 'MM-DD-YYYY'),
      end: moment('10-26-2017', 'MM-DD-YYYY'),
    };

    expect(filterFunctions.filterUsersByDate(dateRange, usersMock)).toHaveLength(2);
  });
});
