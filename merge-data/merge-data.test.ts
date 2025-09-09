
import mergeData from './merge-data';

describe('merge-data', () => {
    test('merge for two users', () => {
    expect(
      mergeData([
        { user: 8, duration: 50, equipment: ['bench'] },
        { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
        { user: 8, duration: 50, equipment: ['bench'] },
        { user: 7, duration: 150, equipment: ['bench', 'kettlebell'] },
      ]),
    ).toEqual([
      { user: 8, duration: 100, equipment: ['bench'] },
      {
        user: 7,
        duration: 300,
        equipment: ['bench', 'dumbbell', 'kettlebell'],
      },
    ]);
  });
});