type Field = {
  name: string
  label: string
  type: string
  rules: [{ required: boolean; message: string }]
}

type Page = {
  title?: string
  description?: string
  metas?: any
}

interface DustbinState {
  accepts: string[]
  lastDroppedItem: any | []
}

// interface BoxState {
//   name: string
//   type: string
// }
//
// interface DustbinSpec {
//   accepts: string[]
//   lastDroppedItem: any
// }
//
// interface BoxSpec {
//   name: string
//   type: string
// }

// interface ContainerState {
//   droppedBoxNames: string[]
//   dustbins: DustbinSpec[]
//   boxes: BoxSpec[]
// }

//library types
interface CurrentWorkout {
  id?: string
  accepts: string
  addInLibrary: number
  created: number
  blocks?: []
  exerciseColorId: string
  exerciseSoundId: string
  image: string
  isDefault: number
  isUsed: number
  modified: number
  preparationTime: number
  restColorId: string
  restSoundId: string
  searchTitle: string
  status: number
  ticks: number
  title: string
  totalBlocks: number
  totalExercises: number
  totalTime: number
  userId: string
  volume: number
}

interface Workoutz {
  id?: string
  accepts: string
  addInLibrary: number
  created: number
  blocks?: []
  exerciseColorId: string
  exerciseSoundId: string
  image: string
  isDefault: number
  isUsed: number
  modified: number
  preparationTime: number
  restColorId: string
  restSoundId: string
  searchTitle: string
  status: number
  ticks: number
  title: string
  totalBlocks: number
  totalExercises: number
  totalTime: number
  userId: string
  volume: number
}

interface Typo<T> {
  [key: string]: T
}

interface Workspace extends General {
  workout?: Workoutz
}

interface Workout extends General {
  blocks: Typo<Block>
}

interface Block extends General {
  exercises: Typo<Exercise>
}

interface Exercise {
  addTime?: any
  addInLibrary?: number
  addedInLibrary: number
  comboExercises?: any
  comboType: number
  created: number
  isDefault: number
  isUsed: number
  modified: number
  reps: number
  splitInterval: number
  status: number
  type: number
  isLeft?: boolean
  duration: string
  accepts: string
  altTitle: string
  id: string
  mainTitle: string
  searchText: string
  userId: string
  altDemoYtLink: string
  altInstructions: string
  altTechnicalYtLink: string
  bodyWeightId: string
  homeAppliencesId: string
  mainDemoYtLink: string
  mainInstructions: string
  mainTechnicalYtLink: string
  resistanceBandId: string
  suspensionTrainerId: string
}
