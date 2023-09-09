interface Generic {
  id: string
  title: string
  accepts?: string
}

export interface Workspace extends Generic {
  blocks: Block[]
}

interface Block extends Generic {
  exercises: Exercise[]
}

type Exercise = Generic
