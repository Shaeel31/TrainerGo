import { db } from '../firebase/index'
import moment from 'moment'
import firebase from 'firebase/app'
import { errorResponse, successResponse } from './commonServices'
import { isUserAuthenticated } from './authServices'

const blockFormatCollection = db.collection('blockFormat'),
  blocksOrderCollection = db.collection('blocksOrder'),
  workoutsCollection = db.collection('workouts'),
  exercisesOrderCollection = db.collection('exercisesOrder'),
  exercisesCollection = db.collection('exercises'),
  blocksCollection = db.collection('blocks')

const newBlock = async (workoutId: string) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const newBlockId = blocksCollection.doc().id

    const blockObj = {
      id: newBlockId,
      status: 1,
      title: 'Untitled',
      formatId: null,
      addInLibrary: 0,
      rounds: 1,
      userId,
      accepts: 'block',
      addedInLibrary: 0,
      type: 1, // 1 => block 2 => rest
      isDefault: 0, // 0 => Not Default  1 => Default
      duration: 0, // in seconds
      isUsed: 1, // 0 => not used   1 => used
      searchText: encodeURI('untitled'),
      created: moment().unix(),
      modified: moment().unix()
    }

    const addBlock = async (blockObj) => {
      try {
        const newExerciseOrderId = exercisesOrderCollection.doc().id
        await blocksCollection.doc(blockObj.id).set(blockObj)


        await exercisesOrderCollection.doc(newExerciseOrderId).set({
          exerciseIds: [],
          status: 1,
          userId,
          blockId: blockObj.id,
          created: moment().unix(),
          modified: moment().unix()
        })

        const blockOrders = await blocksOrderCollection
          .where('workoutId', '==', workoutId)
          .where('userId', '==', userId)
          .get()
        let blockOrderId

        blockOrders.forEach((doc) => {
          blockOrderId = doc.id
        })

        // blockOrderId = JSON.parse(JSON.stringify(blockOrderId.data()));

        await blocksOrderCollection.doc(blockOrderId).update({
          blockIds: firebase.firestore.FieldValue.arrayUnion(newBlockId)
        })

        if (workoutId) {
          await workoutsCollection.doc(workoutId).update({
            modified: moment().unix()
          })
        }
      } catch (err) {
        console.log(err)
      }

    }
    addBlock(blockObj)

    return successResponse('Block created successfully', { ...blockObj, exercises: [] })
  } catch (error) {
    // console.log(error)
    return errorResponse(2)
  }
}

const editBlock = async (
  title: string,
  formatId: string,
  rounds: number,
  blockId: string,
  workoutId: string = ''
) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const updateObj = { modified: moment().unix() }

    if (title) {
      updateObj['title'] = title
      updateObj['searchText'] = encodeURI(title.toLowerCase())
    }
    if (formatId) {
      updateObj['formatId'] = formatId
    }
    if (rounds) {
      updateObj['rounds'] = rounds
    }
    if (blockId) {
      updateObj['blockId'] = blockId
    }

    await blocksCollection.doc(blockId).update(updateObj)

    if (workoutId) {
      await workoutsCollection.doc(workoutId).update({
        modified: moment().unix()
      })
    }

    return successResponse('Block edited successfully')
  } catch (error) {
    return errorResponse(2)
  }
}

const fetchBlock = async (blockId: string) => {
  try {
    const userId = await isUserAuthenticated()
    let block

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    block = await blocksCollection.doc(blockId).get()
    block = JSON.parse(JSON.stringify(block.data()))
    const format = await blockFormatCollection.doc(block.formatId).get()
    block.format = format.data()

    return successResponse('Block fetched successfully', block)
  } catch (error) {
    return errorResponse(2)
  }
}

const fetchFormat = async () => {
  try {
    const userId = await isUserAuthenticated()

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    let formats = await blockFormatCollection.where('status', '==', 1).get(),
      formatArr = []

    let document
    formats.forEach((doc) => {
      document = JSON.parse(JSON.stringify(doc.data()))
      document['id'] = doc.id
      formatArr.push(document)
    })

    return successResponse('Format fetched successfully', formatArr)
  } catch (error) {
    // console.log(error)
    return errorResponse(2)
  }
}

const deleteBlock = async (blockId: string, workoutId: string = '') => {
  try {
    const userId = await isUserAuthenticated()

    if (!userId) {
      return errorResponse('User is not authenticated')
    }


    await blocksCollection.doc(blockId).update({
      status: 0,
      modified: moment().unix()
    })

    if (workoutId) {
      await workoutsCollection.doc(workoutId).update({
        modified: moment().unix()
      })
    }

    return successResponse('Block deleted successfully')
  } catch (error) {
    return errorResponse(2)
  }
}

const fetchBlocks = async (limit: number, searchText = '', isUsed = 0, sort = 0) => {
  try {
    limit = 100
    const userId = await isUserAuthenticated(),
      blocksArr = [],
      defaultBlocksArr = []
    let blocksLimit,
      blocks,
      document,
      query,
      queryUserBlocks,
      responseArr = []

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    query = blocksCollection
    query = query.where('status', '==', 1)
    query = query.where('isDefault', '==', 1)
    query = query.where('addInLibrary', '==', 1)

    switch (sort) {
      case 1:
        query = query.orderBy('searchText', 'asc')
        break
      case 2:
        query = query.orderBy('created', 'desc')
        break
    }

    if (searchText) {
      query = query.orderBy('searchText')
      query = query.startAt(encodeURI(searchText.toLowerCase()))
      query = query.endBefore(encodeURI(searchText.toLowerCase()) + '~')
    }
    query = query.limit(limit)
    const defaultBlocks = await query.get()

    defaultBlocks.forEach((doc) => {
      document = JSON.parse(JSON.stringify(doc.data()))
      document['id'] = doc.id
      defaultBlocksArr.push(document)
    })

    if (
      defaultBlocks.size == 0 ||
      Math.abs(defaultBlocks.size - limit) < limit
    ) {
      blocksLimit = Math.abs(defaultBlocks.size - limit)

      queryUserBlocks = await blocksCollection
      if (isUsed) {
        queryUserBlocks = queryUserBlocks.where('isUsed', '==', 1)
      }
      queryUserBlocks = queryUserBlocks.where('status', '==', 1)
      queryUserBlocks = queryUserBlocks.where('isDefault', '==', 0)
      queryUserBlocks = queryUserBlocks.where('userId', '==', userId)
      queryUserBlocks = queryUserBlocks.where('addInLibrary', '==', 1)

      switch (sort) {
        case 1:
          queryUserBlocks = queryUserBlocks.orderBy('title', 'asc')
          break
        case 2:
          queryUserBlocks = queryUserBlocks.orderBy('created', 'desc')
          break
      }

      if (searchText) {
        queryUserBlocks = queryUserBlocks.orderBy('searchText')
        queryUserBlocks = queryUserBlocks.startAt(
          encodeURI(searchText.toLowerCase())
        )
        queryUserBlocks = queryUserBlocks.endBefore(
          encodeURI(searchText.toLowerCase()) + '~'
        )
      }
      queryUserBlocks = queryUserBlocks.limit(blocksLimit)
      blocks = await queryUserBlocks.get()

      blocks.forEach((doc) => {
        document = JSON.parse(JSON.stringify(doc.data()))
        document['id'] = doc.id
        blocksArr.push(document)
      })
    }

    responseArr = [...defaultBlocksArr, ...blocksArr]

    return successResponse('Blocks fetched successfully', responseArr)
  } catch (error) {
    // console.log(error)
    return errorResponse(2)
  }
}

const newBlockRest = async (workoutId: string, duration: number) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }
    let newBlockId = blocksCollection.doc().id

    let blockObj = {
      id: newBlockId,
      status: 1,
      title: 'Rest',
      type: 2,
      duration: moment(duration * 1000).format('mm:ss'),
      isUsed: 0, // 0 => not used   1 => used
      searchText: encodeURI('rest'),
      created: moment().unix(),
      modified: moment().unix()
    }

    const addBlockRest = async (newBlockId, blockObj) => {
      try {
        let newExerciseOrderId = exercisesOrderCollection.doc().id

        await blocksCollection.doc(newBlockId).set(blockObj)

        const blockOrders = await blocksOrderCollection
          .where('workoutId', '==', workoutId)
          .where('userId', '==', userId)
          .get()
        let blockOrderId

        blockOrders.forEach((doc) => {
          blockOrderId = doc.id
        })

        await exercisesOrderCollection.doc(newExerciseOrderId).set({
          exerciseIds: [],
          status: 1,
          userId,
          blockId: newBlockId,
          created: moment().unix(),
          modified: moment().unix()
        })

        await blocksOrderCollection.doc(blockOrderId).update({
          blockIds: firebase.firestore.FieldValue.arrayUnion(newBlockId)
        })

        if (workoutId) {
          await workoutsCollection.doc(workoutId).update({
            modified: moment().unix()
          })
        }
      } catch (error) {
        return errorResponse(2)
      }
    }

    addBlockRest(newBlockId, blockObj)

    return successResponse('Rest created successfully', blockObj)
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const copyBlock = async (blockObj: any, workoutId: string, blockId: string) => {
  try {
    blockObj = JSON.parse(JSON.stringify(blockObj))

    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }
    const newBlockId = blocksCollection.doc().id

    const copyBlock = async () => {

      const blockOrders = await blocksOrderCollection
        .where('workoutId', '==', workoutId)
        .where('userId', '==', userId)
        .get()
      let blockOrderId,
        newExerciseOrderId = exercisesOrderCollection.doc().id

      blockOrders.forEach((doc) => {
        blockOrderId = doc.id
      })

      await blocksOrderCollection.doc(blockOrderId).update({
        blockIds: firebase.firestore.FieldValue.arrayUnion(newBlockId)
      })

      let block: any = await blocksCollection.doc(blockId).get(),
        oldblockId = block.id

      block = JSON.parse(JSON.stringify(block.data() || {}))
      block['addInLibrary'] = 0
      block['created'] = moment().unix()
      block['modified'] = moment().unix()
      block['isUsed'] = 0
      await blocksCollection.doc(newBlockId).set(block)

      let exercisesOrder = await exercisesOrderCollection
        .where('blockId', '==', oldblockId)
        .where('userId', '==', userId)
        .where('status', '==', 1)
        .get()

      let exerciseOrderObj = {},
        exerciseIdsArr = []

      exercisesOrder.forEach((exerciseOrder) => {
        exerciseOrderObj = exerciseOrder.data()
        exerciseIdsArr = exerciseOrderObj['exerciseIds']
      })

      let exercises,
        exercisesArr = [],
        exercisesObj = {},
        batch = db.batch(),
        newExercisesIds = []

      for (let i = 0; i < exerciseIdsArr.length; i = i + 10) {
        exercises = await exercisesCollection
          .where('status', '==', 1)
          .where(
            firebase.firestore.FieldPath.documentId(),
            'in',
            exerciseIdsArr.slice(i, i + 10)
          )
          .get()
        //exercisesArr.push()

        exercises.forEach((exercise) => {
          exercisesObj = exercise.data()
          exercisesObj['id'] = exercise.id
          exercisesArr.push(exercisesObj)
        })
      }

      let newFetchedExercisesArr = new Array(exercisesArr.length).fill(0)
      exercisesArr.forEach((exercise) => {
        newFetchedExercisesArr[
          exerciseIdsArr.findIndex((element) => element == exercise.id)
        ] = exercise
      })

      newFetchedExercisesArr = newFetchedExercisesArr.filter((element) => element !== 0)
      exercisesArr = newFetchedExercisesArr

      let newExerciseId
      if (exercisesArr && exercisesArr.length) {
        exercisesArr.forEach((exercise) => {
          exercise.created = moment().unix()

          if (exercise.comboType == 3) {
            let newParentExerciseId = exercisesCollection.doc().id
            if (exercise.comboType == 3) {
              newExercisesIds.push(newParentExerciseId)
              var docRef = exercisesCollection.doc(newParentExerciseId)
              batch.set(docRef, exercise)
            }

            exercisesArr.forEach((exerciseData) => {
              if (
                exerciseData.comboType == 4 &&
                exerciseData.comboParentId == exercise.id
              ) {
                exerciseData.created = moment().unix()
                newExerciseId = exercisesCollection.doc().id
                newExercisesIds.push(newExerciseId)
                exerciseData.comboParentId = newParentExerciseId

                var docRef = exercisesCollection.doc(newExerciseId)
                batch.set(docRef, exerciseData)
              }
            })
          } else if (exercise.comboType == 0) {
            newExerciseId = exercisesCollection.doc().id
            newExercisesIds.push(newExerciseId)
            var docRef = exercisesCollection.doc(newExerciseId)
            batch.set(docRef, exercise)
          }
        })
      }

      await batch.commit()

        ; (exerciseOrderObj['blockId'] = newBlockId),
          (exerciseOrderObj['exerciseIds'] = newExercisesIds),
          await exercisesOrderCollection
            .doc(newExerciseOrderId)
            .set(exerciseOrderObj)

      if (workoutId) {
        await workoutsCollection.doc(workoutId).update({
          modified: moment().unix()
        })
      }
    }
    copyBlock()
    blockObj['id'] = newBlockId
    blockObj['addInLibrary'] = 0
    blockObj['created'] = moment().unix()
    blockObj['modified'] = moment().unix()
    blockObj['isUsed'] = 0

    console.log('*************************')
    console.log(blockObj)
    console.log('*************************')


    return successResponse('Copy created successfully', blockObj)
  } catch (error) {
    // console.log(error)
    return errorResponse(2)
  }
}

const deleteRest = async (blockId: string) => {
  try {
    const userId = await isUserAuthenticated()

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    await blocksCollection.doc(blockId).update({
      status: 0,
      modified: moment().unix()
    })

    return successResponse('Block copy made')
  } catch (error) {
    return errorResponse(2)
  }
}

const editRest = async (title: string, blockId: string, duration: number) => {
  try {
    const userId = await isUserAuthenticated()

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const updateObj = { modified: moment().unix() }

    if (title) {
      updateObj['title'] = title
      updateObj['searchText'] = encodeURI(title.toLowerCase())
    }
    if (duration) {
      updateObj['duration'] = duration
    }

    await blocksCollection.doc(blockId).update(updateObj)

    return successResponse('Rest edited successfully')
  } catch (error) {
    return errorResponse(2)
  }
}

const blocksSaveIt = async (blockObj: any, workoutId: string, blockId: string, type: number) => {
  debugger
  try {
    blockObj = JSON.parse(JSON.stringify(blockObj))
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const saveBlock = async () => {
      if (type == 0) {
        let block: any = await blocksCollection.doc(blockId).get()
        block = JSON.parse(JSON.stringify(block.data()))
        block['addInLibrary'] = 1
        block['created'] = moment().unix()
        block['modified'] = moment().unix()
        block['isUsed'] = 0
        const newBlockId = blocksCollection.doc().id
        await blocksCollection.doc(newBlockId).set(block)

        await blocksCollection.doc(blockId).update({ parentBlock: newBlockId, addedInLibrary: 1 })

        let exercisesOrder = await exercisesOrderCollection
          .where('blockId', '==', blockId)
          .where('userId', '==', userId)
          .where('status', '==', 1)
          .get(),
          newExerciseOrderId = exercisesOrderCollection.doc().id

        let exerciseOrderObj = {},
          exerciseIdsArr = []

        exercisesOrder.forEach(exerciseOrder => {

          exerciseOrderObj = exerciseOrder.data()
          exerciseIdsArr = exerciseOrderObj['exerciseIds']
        })

        let exercises,
          batch = db.batch(),
          exercisesArr = [],
          exercisesObj = {},
          newExercisesIds = []

        for (let i = 0; i < exerciseIdsArr.length; i = i + 10) {

          exercises = await exercisesCollection
            .where('status', '==', 1)
            .where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              exerciseIdsArr.slice(i, i + 10)
            )
            .get()
          exercisesArr.push()

          exercises.forEach((exercise) => {
            exercisesObj = exercise.data()
            exercisesObj['id'] = exercise.id
            exercisesArr.push(exercisesObj)
          })

        }

        let newFetchedExercisesArr = new Array(exercisesArr.length).fill(0)
        exercisesArr.forEach((exercise) => {
          newFetchedExercisesArr[exerciseIdsArr.findIndex((element) => element == exercise.id)] = exercise
        })
        newFetchedExercisesArr = newFetchedExercisesArr.filter((element) => element !== 0)
        exercisesArr = newFetchedExercisesArr

        let newExerciseId
        if (exercisesArr && exercisesArr.length) {

          exercisesArr.forEach((exercise) => {
            exercise.created = moment().unix()

            if (exercise.comboType == 3) {
              let newParentExerciseId = exercisesCollection.doc().id
              if (exercise.comboType == 3) {
                newExercisesIds.push(newParentExerciseId)
                var docRef = exercisesCollection.doc(newParentExerciseId)
                batch.set(docRef, exercise)
              }

              exercisesArr.forEach((exerciseData) => {
                if (exerciseData.comboType == 4 && exerciseData.comboParentId == exercise.id) {

                  exerciseData.created = moment().unix()
                  newExerciseId = exercisesCollection.doc().id
                  newExercisesIds.push(newExerciseId)
                  exerciseData.comboParentId = newParentExerciseId

                  var docRef = exercisesCollection.doc(newExerciseId)
                  batch.set(docRef, exerciseData)
                }
              })

            } else if (exercise.comboType == 0) {
              newExerciseId = exercisesCollection.doc().id
              newExercisesIds.push(newExerciseId)
              var docRef = exercisesCollection.doc(newExerciseId)
              batch.set(docRef, exercise)
            }
          })
        }

        await batch.commit()
        ////////////

        exerciseOrderObj['blockId'] = newBlockId,
          exerciseOrderObj['exerciseIds'] = newExercisesIds,

          await exercisesOrderCollection.doc(newExerciseOrderId).set(exerciseOrderObj)
        if (workoutId) {
          await workoutsCollection.doc(workoutId).update({
            modified: moment().unix()
          })
        }
      } else if (type == 1) {
        let block: any = await blocksCollection.doc(blockId).get()
        block = JSON.parse(JSON.stringify(block.data()))
        block['addInLibrary'] = 1
        block['addedInLibrary'] = 1
        block['created'] = moment().unix()
        block['isUsed'] = 0
        block['modified'] = moment().unix()
        let exercisesOrder = await exercisesOrderCollection
          .where('blockId', '==', blockId)
          .where('userId', '==', userId)
          .where('status', '==', 1)
          .get(),
          oldExercisesOrder = await exercisesOrderCollection
            .where('blockId', '==', block.parentBlock)
            .where('userId', '==', userId)
            .where('status', '==', 1)
            .get(),
          parentExerciseOrderId

        oldExercisesOrder.forEach((doc) => {
          parentExerciseOrderId = doc.id
        })

        let exerciseOrderObj = {},
          exerciseIdsArr = []
        exercisesOrder.forEach(exerciseOrder => {
          exerciseOrderObj = exerciseOrder.data()
          exerciseIdsArr = exerciseOrderObj['exerciseIds']
        })
        let exercises,
          batch = db.batch(),
          exercisesArr = [],
          exercisesObj = {},
          newExercisesIds = []

        for (let i = 0; i < exerciseIdsArr.length; i = i + 10) {

          exercises = await exercisesCollection
            .where('status', '==', 1)
            .where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              exerciseIdsArr.slice(i, i + 10)
            )
            .get()

          exercises.forEach((exercise) => {
            exercisesObj = exercise.data()
            exercisesObj['id'] = exercise.id
            exercisesArr.push(exercisesObj)
          })

        }

        let newFetchedExercisesArr = new Array(exercisesArr.length).fill(0)
        exercisesArr.forEach((exercise) => {
          newFetchedExercisesArr[exerciseIdsArr.findIndex((element) => element == exercise.id)] = exercise
        })
        newFetchedExercisesArr = newFetchedExercisesArr.filter((element) => element !== 0)
        exercisesArr = newFetchedExercisesArr

        let newExerciseId
        if (exercisesArr && exercisesArr.length) {

          exercisesArr.forEach((exercise) => {
            exercise.created = moment().unix()

            if (exercise.comboType == 3) {
              let newParentExerciseId = exercisesCollection.doc().id
              if (exercise.comboType == 3) {
                newExercisesIds.push(newParentExerciseId)
                var docRef = exercisesCollection.doc(newParentExerciseId)
                batch.set(docRef, exercise)
              }

              exercisesArr.forEach((exerciseData) => {
                if (exerciseData.comboType == 4 && exerciseData.comboParentId == exercise.id) {

                  exerciseData.created = moment().unix()
                  newExerciseId = exercisesCollection.doc().id
                  newExercisesIds.push(newExerciseId)
                  exerciseData.comboParentId = newParentExerciseId

                  var docRef = exercisesCollection.doc(newExerciseId)
                  batch.set(docRef, exerciseData)
                }
              })

            } else if (exercise.comboType == 0) {
              newExerciseId = exercisesCollection.doc().id
              newExercisesIds.push(newExerciseId)
              var docRef = exercisesCollection.doc(newExerciseId)
              batch.set(docRef, exercise)
            }
          })
        }

        await batch.commit()

        exerciseOrderObj['exerciseIds'] = newExercisesIds
        await exercisesOrderCollection.doc(parentExerciseOrderId).update({
          exerciseIds: newExercisesIds
        })
        // await exercisesOrderCollection.doc(newExerciseOrderId).set(exerciseOrderObj)
        await blocksCollection.doc(block.parentBlock).update(block)

      } else if (type == 2) {
        let block: any = await blocksCollection.doc(blockId).get()
        block = JSON.parse(JSON.stringify(block.data()))
        block['addInLibrary'] = 1
        block['created'] = moment().unix()
        block['modified'] = moment().unix()
        block['title'] = `${block['title']}-Copy`
        block['isUsed'] = 0
        const newBlockId = blocksCollection.doc().id
        await blocksCollection.doc(newBlockId).set(block)
        let exercisesOrder = await exercisesOrderCollection
          .where('blockId', '==', blockId)
          .where('userId', '==', userId)
          .where('status', '==', 1)
          .get(),
          newExerciseOrderId = exercisesOrderCollection.doc().id

        let exerciseOrderObj = {},
          exerciseIdsArr = []

        exercisesOrder.forEach(exerciseOrder => {

          exerciseOrderObj = exerciseOrder.data()
          exerciseIdsArr = exerciseOrderObj['exerciseIds']
        })
        /////
        // let exercises,
        //     batch = db.batch(),
        //     newExercisesIds = [];

        // for(let i = 0; i < exerciseIdsArr.length; i = i + 10){
        //   exercises = await exercisesCollection
        //   .where('status', '==', 1)
        //   .where(
        //     firebase.firestore.FieldPath.documentId(),
        //     'in',
        //     exerciseIdsArr.slice(i, i + 10)
        //   )
        //   .get();

        //   if(exercises?.size){

        //     exercises.forEach((exercise) => {
        //       const newExerciseId = exercisesCollection.doc().id
        //       newExercisesIds.push(newExerciseId)
        //       var docRef = exercisesCollection.doc(newExerciseId); //automatically generate unique id
        //       batch.set(docRef, exercise.data());      
        //     })
        //   }  
        // }
        // batch.commit();
        ////
        let exercises,
          batch = db.batch(),
          exercisesArr = [],
          exercisesObj = {},
          newExercisesIds = []

        for (let i = 0; i < exerciseIdsArr.length; i = i + 10) {

          exercises = await exercisesCollection
            .where('status', '==', 1)
            .where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              exerciseIdsArr.slice(i, i + 10)
            )
            .get()

          exercises.forEach((exercise) => {
            exercisesObj = exercise.data()
            exercisesObj['id'] = exercise.id
            exercisesArr.push(exercisesObj)
          })

        }

        let newFetchedExercisesArr = new Array(exercisesArr.length).fill(0)
        exercisesArr.forEach((exercise) => {
          newFetchedExercisesArr[exerciseIdsArr.findIndex((element) => element == exercise.id)] = exercise
        })
        newFetchedExercisesArr = newFetchedExercisesArr.filter((element) => element !== 0)
        exercisesArr = newFetchedExercisesArr

        let newExerciseId
        if (exercisesArr && exercisesArr.length) {
      
          exercisesArr.map((exercise) => {
            exercise.created = moment().unix()

            if (exercise.comboType == 3) {
              let newParentExerciseId = exercisesCollection.doc().id
              if (exercise.comboType == 3) {
                newExercisesIds.push(newParentExerciseId)
                var docRef = exercisesCollection.doc(newParentExerciseId)
                batch.set(docRef, exercise)
              }

              exercisesArr.forEach(async (exerciseData) => {

                if (exerciseData.comboType == 4 && exerciseData.comboParentId == exercise.id) {
            
                  exerciseData.created = moment().unix()
                  newExerciseId = exercisesCollection.doc().id
                  newExercisesIds.push(newExerciseId)
                  exerciseData.comboParentId = newParentExerciseId

                  var docRef = exercisesCollection.doc(newExerciseId)
                  await batch.set(docRef, exerciseData)
                }
              })
      
            } else if (exercise.comboType == 0) {
              newExerciseId = exercisesCollection.doc().id
              newExercisesIds.push(newExerciseId)
              var docRef = exercisesCollection.doc(newExerciseId)
              batch.set(docRef, exercise)
            }
          })
        }

        await batch.commit()
        /////

        exerciseOrderObj['blockId'] = newBlockId
        exerciseOrderObj['exerciseIds'] = newExercisesIds

        await exercisesOrderCollection.doc(newExerciseOrderId).set(exerciseOrderObj)

      }
    }

    saveBlock()

    if (type == 0) {
      blockObj['addInLibrary'] = 1
      blockObj['addedInLibrary'] = 1
      blockObj['created'] = moment().unix()
      blockObj['modified'] = moment().unix()
      blockObj['isUsed'] = 0
    } else if (type == 1) {
      blockObj['addInLibrary'] = 1
      blockObj['addedInLibrary'] = 1
      blockObj['created'] = moment().unix()
      blockObj['modified'] = moment().unix()
      blockObj['isUsed'] = 0
    } else if (type == 2) {
      blockObj['addInLibrary'] = 1
      blockObj['addedInLibrary'] = 1
      blockObj['created'] = moment().unix()
      blockObj['modified'] = moment().unix()
      blockObj['title'] = `${blockObj['title']}-Copy`
      blockObj['isUsed'] = 0
    }

    console.log('*********************')
    console.log(blockObj)
    console.log('*********************')

    return successResponse('success', blockObj)
  } catch (error) {
    return errorResponse(2)
  }
}

const arrayIndexChange = (arr, oldIndex, newIndex) => {
  if (newIndex >= arr.length) {
    let iter = newIndex - arr.length + 1
    while (iter--) {
      arr.push(undefined)
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  return arr
}

const sortBlocks = async (
  workoutId: string,
  oldIndex: number,
  newIndex: number
) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const blockOrders = await blocksOrderCollection
      .where('workoutId', '==', workoutId)
      .where('userId', '==', userId)
      .get()
    let blocks, blockOrderId, blockOrderData

    blockOrders.forEach((doc) => {
      blockOrderId = doc.id
      blockOrderData = doc.data()
    })
    blocks = blockOrderData.blockIds

    blocks = arrayIndexChange(blocks, oldIndex, newIndex)

    await blocksOrderCollection.doc(blockOrderId).update({
      blockIds: blocks
    })

    return successResponse('success')
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const useBlock = async (workoutId: string, blockId: string) => {
  console.log('Hello')
  debugger
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }
    const block = await blocksCollection.doc(blockId).get(),
      blockObj = JSON.parse(JSON.stringify(block.data()))
    const newBlockId = blocksCollection.doc().id

    await blocksCollection.doc(newBlockId).set({
      status: 1,
      title: blockObj.title,
      formatId: blockObj.formatId,
      addInLibrary: 0,
      addedInLibrary: 0,
      parentBlock: blockId,
      rounds: blockObj.rounds,
      userId,
      accepts: 'block',
      type: blockObj.type, // 1 => block 2 => rest
      isDefault: 0, // 0 => Not Default  1 => Default
      duration: blockObj.duration, // in seconds
      isUsed: 1, // 0 => not used   1 => used
      searchText: encodeURI(blockObj.title),
      created: moment().unix(),
      modified: moment().unix()
    })
    let oldBlockId = blockId
    blockId = newBlockId

    const blockOrders = await blocksOrderCollection
      .where('workoutId', '==', workoutId)
      .where('userId', '==', userId)
      .get()

    let blockOrderId
    blockOrders.forEach((doc) => {
      blockOrderId = doc.id
    })

    await blocksOrderCollection.doc(blockOrderId).update({
      blockIds: firebase.firestore.FieldValue.arrayUnion(blockId)
    })

    let exercisesOrder = await exercisesOrderCollection
      .where('blockId', '==', oldBlockId)
      .where('userId', '==', userId)
      .where('status', '==', 1)
      .get(),
      newExerciseOrderId = exercisesOrderCollection.doc().id

    let exerciseOrderObj = {},
      exerciseIdsArr = []

    exercisesOrder.forEach(exerciseOrder => {

      exerciseOrderObj = exerciseOrder.data()
      exerciseIdsArr = exerciseOrderObj['exerciseIds']
    })
    ////
    // let exercises,
    //     batch = db.batch(),
    //     newExercisesIds = [];

    // for(let i = 0; i < exerciseIdsArr.length; i = i + 10){
    //   exercises = await exercisesCollection
    //   .where('status', '==', 1)
    //   .where(
    //     firebase.firestore.FieldPath.documentId(),
    //     'in',
    //     exerciseIdsArr.slice(i, i + 10)
    //   )
    //   .get();

    //   if(exercises?.size){

    //     exercises.forEach((exercise) => {
    //       const newExerciseId = exercisesCollection.doc().id
    //       newExercisesIds.push(newExerciseId)
    //       var docRef = exercisesCollection.doc(newExerciseId); //automatically generate unique id
    //       batch.set(docRef, exercise.data());
    //     })
    //   }
    // }
    // batch.commit();
    /////
    let exercises,
      batch = db.batch(),
      exercisesArr = [],
      exercisesObj = {},
      newExercisesIds = []

    for (let i = 0; i < exerciseIdsArr.length; i = i + 10) {

      exercises = await exercisesCollection
        .where('status', '==', 1)
        .where(
          firebase.firestore.FieldPath.documentId(),
          'in',
          exerciseIdsArr.slice(i, i + 10)
        )
        .get()
      exercisesArr.push()

      exercises.forEach((exercise) => {
        exercisesObj = exercise.data()
        exercisesObj['id'] = exercise.id
        exercisesArr.push(exercisesObj)
      })

    }

    let blockDuration = 0

    let newExerciseId
    if (exercisesArr && exercisesArr.length) {
      let comboExercisesArray = []
      debugger
      exercisesArr.map((exercise) => {
        exercise.created = moment().unix()
        blockDuration += moment.duration(`00:${exercise['duration']}`).asSeconds();
        if (exercise.comboType == 3) {
          let newParentExerciseId = exercisesCollection.doc().id
          if (exercise.comboType == 3) {
            newExercisesIds.push(newParentExerciseId)
            var docRef = exercisesCollection.doc(newParentExerciseId)
            batch.set(docRef, exercise)
          }

          exercisesArr.forEach(async (exerciseData , idx , self) => {
            if (exerciseData.comboType == 4 && exerciseData.comboParentId == exercise.id) {
              
              const comboExerciseIndex = self.findIndex((x)=>x.id == exerciseData.id);
              exercisesArr[comboExerciseIndex].isCombo = true;

              // const comboExercise = self.find(item => item.id === exerciseData.id);
              // comboExercise.isCombo = true
              // exercisesArr.splice(comboExerciseIndex, 1);
              comboExercisesArray.push(exerciseData);
              exerciseData.created = moment().unix()
              newExerciseId = exercisesCollection.doc().id
              newExercisesIds.push(newExerciseId)
              exerciseData.comboParentId = newParentExerciseId
              var docRef = exercisesCollection.doc(newExerciseId)
              await batch.set(docRef, exerciseData)
            }
            if(idx == self.length-1){
              exercise.comboExercises = comboExercisesArray;
              comboExercisesArray = []
            }
          })

        } else if (exercise.comboType == 0) {
          newExerciseId = exercisesCollection.doc().id
          newExercisesIds.push(newExerciseId)
          var docRef = exercisesCollection.doc(newExerciseId)
          batch.set(docRef, exercise)
        }
      })
    }

    await batch.commit()



    console.log(exercisesArr)
    exerciseOrderObj['blockId'] = newBlockId,
      exerciseOrderObj['exerciseIds'] = newExercisesIds,

      await exercisesOrderCollection.doc(newExerciseOrderId).set(exerciseOrderObj)

    await workoutsCollection.doc(workoutId).update({
      modified: moment().unix()
    })
    debugger
    let finalExercisesArray =  exercisesArr.filter(item=>!item.isCombo);
    console.log(finalExercisesArray)
    const newBlockObj = {
      id: newBlockId,
      status: 1,
      exercises:finalExercisesArray,
      title: blockObj.title,
      formatId: blockObj.formatId,  
      addInLibrary: 0,
      addedInLibrary: 0,
      parentBlock: blockId,
      rounds: blockObj.rounds,
      userId,
      accepts: 'block',
      type: blockObj.type, // 1 => block 2 => rest
      isDefault: 0, // 0 => Not Default  1 => Default
      exerciseTotalTime: moment(blockDuration * 1000).format('mm:ss'),
      duration: blockDuration, // in seconds
      isUsed: 1, // 0 => not used   1 => used
      searchText: encodeURI(blockObj.title),
      created: moment().unix(),
      modified: moment().unix()
    }

    console.log("Block Object =====>", newBlockObj);

    return successResponse('Block added successfully', newBlockObj)
  } catch (error) {
    // console.log(error)
    return errorResponse(2)
  }
}

export {
  newBlock,
  editBlock,
  fetchBlock,
  deleteBlock,
  fetchBlocks,
  newBlockRest,
  deleteRest,
  editRest,
  blocksSaveIt,
  sortBlocks,
  useBlock,
  fetchFormat,
  copyBlock
}
