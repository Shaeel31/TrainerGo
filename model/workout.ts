export const trenergo_workouts: Workspace = {
  id: 'WORKSPACE_01',
  title: 'Workspace one',
  ref: 'WORKSPACE',
  current: null,
  accepts: 'workout',
  FK: 'USER_01',
  workouts: {
    WORK_01: {
      ref: 'WORK_01',
      id: 'W_1',
      title: 'WORKOUT 001',
      accepts: 'workout',
      FK: 'WORKSPACE_01',
      blocks: {
        BLOCK_01: {
          ref: 'BLOCK_01',
          id: 'B_1',
          title: 'BLOCK 001',
          accepts: 'block',
          FK: 'WORK_01',
          exercises: {
            EXR_01: {
              id: 'E_1',
              ref: 'EXR_01',
              title: 'EXERCISE 001',
              accepts: 'exercise',
              FK: 'BLOCK_01',
            },
            EXR_02: {
              id: 'E_2',
              ref: 'EXR_02',
              title: 'EXERCISE 002',
              accepts: 'exercise',
              FK: 'BLOCK_01',
            },
          },
        },
        BLOCK_02: {
          id: 'B_2',
          title: 'BLOCK 002',
          accepts: 'block',
          ref: 'BLOCK_02',
          FK: 'WORK_01',
          exercises: {
            EXR_03: {
              id: 'E_3',
              ref: 'EXR_03',
              title: 'EXERCISE 003',
              FK: 'BLOCK_02',
              accepts: 'exercise',
            },
            EXR_04: {
              id: 'E_4',
              ref: 'EXR_04',
              title: 'EXERCISE 004',
              FK: 'BLOCK_02',
              accepts: 'exercise',
            },
          },
        },
      },
    },
    WORK_02: {
      id: 'W_2',
      title: 'WORKOUT 002',
      accepts: 'workout',
      ref: 'WORK_02',
      FK: 'WORKSPACE_01',
      blocks: {
        BLOCK_03: {
          id: 'B_3',
          ref: 'BLOCK_03',
          title: 'BLOCK 003',
          accepts: 'block',
          FK: 'WORK_02',
          exercises: {
            EXR_05: {
              id: 'E_5',
              ref: 'EXR_05',
              accepts: 'exercise',
              title: 'EXERCISE 005',
              FK: 'BLOCK_03',
            },
          },
        },
      },
    },
  },
}
