import { db } from '../firebase/index'
import moment from 'moment'
import { errorResponse, successResponse } from './commonServices'
import firebase from 'firebase/app'
import axios from 'axios'
import { isUserAuthenticated } from './authServices'

const exercisesOrderCollection = db.collection('exercisesOrder'),
  workoutsCollection = db.collection('workouts'),
  exercisesCollection = db.collection('exercises'),
  adminConfigurationsCollection = db.collection('adminConfigurations')

const newExercise = async (workoutId: string, blockId: string, exerciseObj) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const newExerciseId = exercisesCollection.doc().id

    const newExerciseObj = {
      id: newExerciseId,
      status: 1,
      mainTitle: exerciseObj.mainTitle,
      altTitle: exerciseObj.altTitle,
      mainInstructions: '',
      altInstructions: '',
      mainTechnicalYtLink: '',
      mainDemoYtLink: '',
      altTechnicalYtLink: '',
      altDemoYtLink: '',
      addedInLibrary: 0,
      duration: "00:30", //seconds
      userId,
      image: '',
      altImage: '',
      reps: 0,
      accepts: 'exercise',
      splitInterval: 0, //0 => not splited 1=> splited
      bodyWeightId: '',
      resistanceBandId: '',
      suspensionTrainerId: '',
      parameterIds: ['ST', 'MB', 'HA', 'BW'],
      // {
      //   parameterIds = [
      //     suspensionTrainerId: ST,
      //     resistanceBandId: MB,
      //     homeAppliencesId: HA,
      //     bodyWeightId: BW
      //   ]
      // }
      homeAppliencesId: '',
      splitExercise: '',
      isLeft: false,
      searchText: encodeURI(exerciseObj.mainTitle.toLowerCase()),
      isDefault: 0, // 0 => Not Default  1 => Default
      type: 1, // 1 => exercise 2 => rest
      comboType: 0, //0 => default nothing  3=> combo 4 => part of combo
      isUsed: 1, // 0 => not used   1 => used
      addInLibrary: 0,
      created: moment().unix(),
      modified: moment().unix(),
    }

    const addExercise = async (newExerciseObj) => {
      try {
        await exercisesCollection.doc(newExerciseObj.id).set(newExerciseObj)

        const exerciseOrders = await exercisesOrderCollection
          .where('blockId', '==', blockId)
          .where('userId', '==', userId)
          .get()
        let exerciseOrderId

        exerciseOrders.forEach((doc) => {
          exerciseOrderId = doc.id
        })

        if (workoutId) {
          await workoutsCollection.doc(workoutId).update({
            modified: moment().unix(),
          })
        }

        await exercisesOrderCollection.doc(exerciseOrderId).update({
          exerciseIds: firebase.firestore.FieldValue.arrayUnion(newExerciseId),
        })
      } catch (err) {
        console.log(err)
      }
    }

    addExercise(newExerciseObj)

    return successResponse('Exercises created successfully', newExerciseObj)
  } catch (error) {
    // console.log(error)
    return errorResponse(2)
  }
}

const newCustomExercise = async (exerciseObj) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const newExerciseId = exercisesCollection.doc().id;
    let duration = exerciseObj.duration || 0;

    if (typeof (duration) == 'string') {
      let timeArr = duration.split(':');
      duration = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
    }

    await exercisesCollection.doc(newExerciseId).set({
      status: 1,
      mainTitle: exerciseObj.mainTitle || '',
      altTitle: exerciseObj.altTitle || '',
      mainInstructions: exerciseObj.mainInstructions || '',
      altInstructions: exerciseObj.altInstructions || '',
      mainTechnicalYtLink: exerciseObj.mainTechnicalYtLink || '',
      mainDemoYtLink: exerciseObj.mainDemoYtLink || '',
      altTechnicalYtLink: exerciseObj.altTechnicalYtLink || '',
      altDemoYtLink: exerciseObj.altDemoYtLink || '',
      image: exerciseObj.image || '',
      altImage: exerciseObj.altImage || '',
      addedInLibrary: 1,
      duration,
      userId,
      isCustomExercise: true,
      reps: exerciseObj.reps || 0,
      accepts: 'exercise',
      splitInterval: exerciseObj.splitInterval || 0, //Split Type,
      parameterIds: [exerciseObj.suspensionTrainerId || 0, exerciseObj.resistanceBandId || 0, exerciseObj.homeAppliencesId || 0, exerciseObj.bodyWeightId || 0],
      bodyWeightId: exerciseObj.bodyWeightId,
      resistanceBandId: exerciseObj.resistanceBandId,
      suspensionTrainerId: exerciseObj.suspensionTrainerId,
      searchText: encodeURI(exerciseObj.mainTitle.toLowerCase()),
      isDefault: 0, // 0 => Not Default  1 => Default
      type: 1, // 1 => exercise 2 => rest 
      comboType: 0, //0 => default nothing  3=> combo 4 => part of combo
      isUsed: 0, // 0 => not used   1 => used
      addInLibrary: 1,
      created: moment().unix(),
      modified: moment().unix(),
    })


    return successResponse('Exercises created successfully')
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const editExercise = async (
  exerciseId: string,
  workoutId: string = '',
  mainTitle: any,
  altTitle: any,
  mainInstructions: any,
  altInstructions: any,
  mainTechnicalYtLink: any,
  mainDemoYtLink: any,
  altTechnicalYtLink: any,
  altDemoYtLink: any,
  duration: any,
  reps: any,
  addTime: any,
  splitInterval: any,
  bodyWeightId: any,
  resistanceBandId: any,
  suspensionTrainerId: any,
  homeAppliencesId: any,
  blockId: any,
  type: number,
  saveFeature: number,  // 0=> save feature not used 1=> save feature used 1
  image: string,
  altImage: string,
) => {
  try {

    const userId = await isUserAuthenticated()
    //splitInterval = 0
    if (!userId) {
      return errorResponse('User is not authenticated')
    }
    let updateObj = {},
      exercise: any = await exercisesCollection.doc(exerciseId).get();

    exercise = JSON.parse(JSON.stringify(exercise.data()))

    updateObj['modified'] = moment().unix()

    if (mainTitle) {
      updateObj['mainTitle'] = mainTitle;
      updateObj['searchText'] = encodeURI(mainTitle.toLowerCase());
    }
    if (altTitle) {
      updateObj['altTitle'] = altTitle;
    }
    if (mainInstructions) {
      updateObj['mainInstructions'] = mainInstructions;
    }
    if (altInstructions) {
      updateObj['altInstructions'] = altInstructions;
    }
    if (mainTechnicalYtLink) {
      updateObj['mainTechnicalYtLink'] = mainTechnicalYtLink;
    }
    if (mainDemoYtLink) {
      updateObj['mainDemoYtLink'] = mainDemoYtLink;
    }
    if (altTechnicalYtLink) {
      updateObj['altTechnicalYtLink'] = altTechnicalYtLink;
    }
    if (altDemoYtLink) {
      updateObj['altDemoYtLink'] = altDemoYtLink;
    }
    if (image) {
      updateObj['image'] = image;
    }
    if (altImage) {
      updateObj['altImage'] = altImage;
    }
    if (duration) {
      if (typeof (duration) == 'string') {
        let timeArr = duration.split(':');
        duration = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
        updateObj['duration'] = duration;
      }
    }
    if (reps) {
      updateObj['reps'] = reps;
    }
    if (addTime) {
      let timeArr = addTime.split(':');
      addTime = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
      updateObj['duration'] = addTime;
    }
    if (bodyWeightId) {
      exercise.parameterIds[3] = `${bodyWeightId}`
      updateObj['bodyWeightId'] = bodyWeightId;
      updateObj['parameterIds'] = exercise.parameterIds;
    }
    if (resistanceBandId) {
      exercise.parameterIds[1] = `${resistanceBandId}`
      updateObj['resistanceBandId'] = resistanceBandId;
      updateObj['parameterIds'] = exercise.parameterIds;
    }
    if (suspensionTrainerId) {
      exercise.parameterIds[0] = `${suspensionTrainerId}`
      updateObj['suspensionTrainerId'] = suspensionTrainerId;
      updateObj['parameterIds'] = exercise.parameterIds;

    } if (homeAppliencesId) {
      exercise.parameterIds[2] = `${homeAppliencesId}`
      updateObj['homeAppliencesId'] = homeAppliencesId;
      updateObj['parameterIds'] = exercise.parameterIds;
    }

    await exercisesCollection.doc(exerciseId).update(updateObj)

    //////
    //await exercisesCollection.doc(exerciseId).update(updateObj)
    //////
    if (saveFeature) {
      await exercisesSaveIt(exercise, workoutId, blockId, exerciseId, type);
    }

    // if(workoutId){
    //   await workoutsCollection.doc(workoutId).update({
    //     modified: moment().unix(),
    //   })  
    // }

    return successResponse('Exercise edited successfully')
  } catch (error) {
    return errorResponse(2)
  }
}

const fetchExercise = async (exerciseId: string) => {
  try {
    const userId = await isUserAuthenticated()
    let exercise

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    exercise = await exercisesCollection.doc(exerciseId).get()
    exercise = JSON.parse(JSON.stringify(exercise.data()))

    return successResponse('Exercise fetched successfully', exercise)
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const deleteExercise = async (exerciseId: string, workoutId: string = '', blockId: string = '') => {
  try {
    const userId = await isUserAuthenticated()

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    await exercisesCollection.doc(exerciseId).update({
      status: 0,
      modified: moment().unix(),
    })

    if (workoutId) {
      await workoutsCollection.doc(workoutId).update({
        modified: moment().unix(),
      })
    }

    return successResponse('Exercise deleted successfully')
  } catch (error) {
    return errorResponse(2)
  }
}
//filterType => 1: custom 2: trenergo
const fetchExercises = async (limit: number, searchText = '', isUsed = 0, sort = 0, filterType = 0) => {
  try {
    limit = 100;
    const userId = await isUserAuthenticated(),
      defaultExercisesArr = [],
      exercisesArr = []
    let exercisesLimit,
      responseArr = [],
      exercises,
      document,
      query,
      queryUserExercises

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    query = exercisesCollection
    query = query.where('status', '==', 1)
    query = query.where('isDefault', '==', 1)
    query = query.where('addInLibrary', '==', 1)

    switch (sort) {
      case 1:
        query = query.orderBy('searchText', 'asc');
        break;
      case 2:
        query = query.orderBy('created', 'desc');
        break;
    }

    if (searchText) {
      query = query.orderBy('searchText')
      query = query.startAt(encodeURI(searchText.toLowerCase()))
      query = query.endBefore(encodeURI(searchText.toLowerCase()) + '~')
    }
    query = query.limit(limit)

    const defaultExercises = await query.get()

    defaultExercises.forEach((doc) => {
      document = JSON.parse(JSON.stringify(doc.data()))
      document['id'] = doc.id
      defaultExercisesArr.push(document)
    })

    if (
      (defaultExercises.size == 0 ||
        Math.abs(defaultExercises.size - limit) < limit) &&
      filterType !== 2
    ) {
      exercisesLimit = Math.abs(defaultExercises.size - limit)

      queryUserExercises = await exercisesCollection
      if (filterType == 1) {
        queryUserExercises = queryUserExercises.where('isCustomExercise', '==', true)
      }
      queryUserExercises = queryUserExercises.where('status', '==', 1)
      queryUserExercises = queryUserExercises.where('isDefault', '==', 0)
      queryUserExercises = queryUserExercises.where('userId', '==', userId)
      queryUserExercises = queryUserExercises.where('addInLibrary', '==', 1)

      switch (sort) {
        case 1:
          queryUserExercises = queryUserExercises.orderBy('mainTitle', 'asc');
          break;
        case 2:
          queryUserExercises = queryUserExercises.orderBy('created', 'desc');
          break;
      }

      if (searchText) {
        console.log("asadasdasdasdasdas")

        console.log(searchText)
        queryUserExercises = queryUserExercises.orderBy('searchText')
        queryUserExercises = queryUserExercises.startAt(
          encodeURI(searchText.toLowerCase())
        )
        queryUserExercises = queryUserExercises.endBefore(
          encodeURI(searchText.toLowerCase()) + '~'
        )
      }
      queryUserExercises = queryUserExercises.limit(exercisesLimit)
      exercises = await queryUserExercises.get()

      exercises.forEach((doc) => {
        document = JSON.parse(JSON.stringify(doc.data()))
        document['id'] = doc.id
        exercisesArr.push(document)
      })
    }

    responseArr = [...defaultExercisesArr, ...exercisesArr]

    return successResponse('Exercises fetched successfully', responseArr)
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const newExerciseRest = async (
  blockId: string,
  workoutId: string,
  duration: number
) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const newExerciseId = exercisesCollection.doc().id

    const exerciseRestObj = {
      id: newExerciseId,
      status: 1,
      mainTitle: 'Rest',
      altTitle: 'Rest',
      mainInstructions: '',
      altInstructions: '',
      mainTechnicalYtLink: '',
      mainDemoYtLink: '',
      altTechnicalYtLink: '',
      altDemoYtLink: '',
      image: '',
      addedInLibrary: 0,
      duration: "00:15", //seconds
      userId,
      reps: 10,
      accepts: 'exercise',
      splitInterval: 0, //seconds
      bodyWeightId: '',
      resistanceBandId: '',
      suspensionTrainerId: '',
      homeAppliencesId: '',
      searchText: encodeURI('Rest'),
      isDefault: 0, // 0 => Not Default  1 => Default
      type: 2, // 1 => exercise 2 => rest
      comboType: 0, //0 => default nothing  3=> combo 4 => part of combo
      isUsed: 1, // 0 => not used   1 => used
      addInLibrary: 0,
      created: moment().unix(),
      modified: moment().unix(),
    }

    const addExerciseRest = async (newExerciseId, restObj) => {
      try {
        await exercisesCollection.doc(newExerciseId).set(restObj)

        const exerciseOrders = await exercisesOrderCollection
          .where('blockId', '==', blockId)
          .where('userId', '==', userId)
          .get()
        let exerciseOrderId

        exerciseOrders.forEach((doc) => {
          exerciseOrderId = doc.id
        })

        await exercisesOrderCollection.doc(exerciseOrderId).update({
          exerciseIds: firebase.firestore.FieldValue.arrayUnion(newExerciseId),
        })

        if (workoutId) {
          await workoutsCollection.doc(workoutId).update({
            modified: moment().unix(),
          })
        }
      } catch (error) {
        return errorResponse(2)
      }
    }
    addExerciseRest(newExerciseId, exerciseRestObj)

    return successResponse('Rest created successfully', exerciseRestObj)
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const deleteRest = async (exerciseId: string) => {
  try {
    const userId = await isUserAuthenticated()

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    await exercisesCollection.doc(exerciseId).update({
      status: 0,
      modified: moment().unix(),
    })

    return successResponse('Rest deleted successfully')
  } catch (error) {
    return errorResponse(2)
  }
}

const editRest = async (
  title: string,
  exerciseId: string,
  duration: number
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
    if (duration) {
      updateObj['duration'] = duration
    }
    await exercisesCollection.doc(exerciseId).update(updateObj)

    return successResponse('Rest edited successfully')
  } catch (error) {
    return errorResponse(2)
  }
}

const exercisesSaveIt = async (exerciseObj: any, workoutId: string, blockId: string, exerciseId: string, type: number) => {
  try {
    exerciseObj = JSON.parse(JSON.stringify(exerciseObj))
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const saveExercise = async () => {
      if (type == 0) {
        let exercise: any = await exercisesCollection.doc(exerciseId).get()
        exercise = JSON.parse(JSON.stringify(exercise.data()))
        exercise['addInLibrary'] = 1
        exercise['addedInLibrary'] = 1
        exercise['created'] = moment().unix()
        exercise['modified'] = moment().unix()
        exercise['isUsed'] = 0
        exercise['duration'] = moment.utc(1000 * exercise.duration).format('mm:ss');
        const newExerciseId = exercisesCollection.doc().id
        await exercisesCollection.doc(newExerciseId).set(exercise)
        await exercisesCollection.doc(exerciseId).update({ parentExercise: newExerciseId, addedInLibrary: 1 })
        if (workoutId) {
          await workoutsCollection.doc(workoutId).update({
            modified: moment().unix(),
          })
        }
      } else if (type == 1) {
        let exercise: any = await exercisesCollection.doc(exerciseId).get()
        exercise = JSON.parse(JSON.stringify(exercise.data()))
        exercise['addInLibrary'] = 1
        exercise['addedInLibrary'] = 1
        exercise['created'] = moment().unix()
        exercise['isUsed'] = 0
        exercise['modified'] = moment().unix()
        await exercisesCollection.doc(exercise.parentExercise).update(exercise)
      } else if (type == 2) {
        let exercise: any = await exercisesCollection.doc(exerciseId).get()
        exercise = JSON.parse(JSON.stringify(exercise.data()))
        exercise['addInLibrary'] = 1
        exercise['created'] = moment().unix()
        exercise['modified'] = moment().unix()
        exercise['isUsed'] = 0
        exercise['mainTitle'] = `${exercise['mainTitle']}-Copy`
        const newExerciseId = exercisesCollection.doc().id
        await exercisesCollection.doc(newExerciseId).set(exercise)
      }

    }

    saveExercise()

    if (type == 0) {

      exerciseObj['addInLibrary'] = 1
      exerciseObj['addedInLibrary'] = 1
      exerciseObj['created'] = moment().unix()
      exerciseObj['modified'] = moment().unix()
      exerciseObj['isUsed'] = 0
      exerciseObj['duration'] = moment.utc(1000 * exerciseObj.duration).format('mm:ss');
    }
    else if (type == 1) {
      exerciseObj['addInLibrary'] = 1
      exerciseObj['addedInLibrary'] = 1
      exerciseObj['created'] = moment().unix()
      exerciseObj['isUsed'] = 0
      exerciseObj['modified'] = moment().unix()
    } else if (type == 2) {
      exerciseObj['addInLibrary'] = 1
      exerciseObj['created'] = moment().unix()
      exerciseObj['modified'] = moment().unix()
      exerciseObj['isUsed'] = 0
      exerciseObj['mainTitle'] = `${exerciseObj['mainTitle']}-Copy`
    }

    console.log('***********exercise object************')
    console.log(exerciseObj)
    console.log('***********************')

    return successResponse('success', exerciseObj)
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

const sortExercises = async (
  workoutId: string,
  blockId: string,
  oldIndex: number,
  newIndex: number
) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const exerciseOrders = await exercisesOrderCollection
      .where('blockId', '==', blockId)
      .where('userId', '==', userId)
      .get()

    let exercises,
      exerciseOrderId,
      exerciseOrderData;

    exerciseOrders.forEach((doc) => {
      exerciseOrderId = doc.id
      exerciseOrderData = doc.data()
    })
    exercises = exerciseOrderData.exerciseIds

    exercises = arrayIndexChange(exercises, oldIndex, newIndex)

    await exercisesOrderCollection.doc(exerciseOrderId).update({
      exerciseIds: exercises,
    })

    return successResponse('success', { blockId, exercises })
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const filterExercise = async (
  limit: number,
  suspensionTrainerId: any,
  resistanceBandId: any,
  homeAppliencesId: any,
  bodyWeightId: any
) => {
  try {

    const userId = await isUserAuthenticated(),
      defaultExercisesArr = [],
      exercisesArr = [];

    console.log(suspensionTrainerId, resistanceBandId, homeAppliencesId, bodyWeightId)
    if ((suspensionTrainerId.length + resistanceBandId.length + homeAppliencesId.length + bodyWeightId.length) > 10) {
      return errorResponse('Filter elements should not be more than 10')
    }

    let parameterIds = [...suspensionTrainerId, ...resistanceBandId, ...homeAppliencesId, ...bodyWeightId];
    let document;

    limit = 50;

    let exercisesLimit, exercises, query, queryUserExercises;

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    query = exercisesCollection
    query = query.where('status', '==', 1)
    query = query.where('isDefault', '==', 1)
    query = query.where('addInLibrary', '==', 1)

    if (parameterIds && parameterIds.length) {
      query = query.where('parameterIds', 'array-contains-any', parameterIds)
    }

    query = query.limit(limit)
    const defaultExercises = await query.get()

    defaultExercises.forEach((doc) => {
      document = JSON.parse(JSON.stringify(doc.data()))
      document['id'] = doc.id
      defaultExercisesArr.push(document)
    })

    if (
      defaultExercises.size == 0 ||
      Math.abs(defaultExercises.size - limit) < limit
    ) {
      exercisesLimit = Math.abs(defaultExercises.size - limit)
      queryUserExercises = await exercisesCollection
      queryUserExercises = queryUserExercises.where('status', '==', 1)
      queryUserExercises = queryUserExercises.where('isDefault', '==', 0)
      queryUserExercises = queryUserExercises.where('userId', '==', userId)
      queryUserExercises = queryUserExercises.where('addInLibrary', '==', 1)

      if (parameterIds && parameterIds.length) {
        queryUserExercises = queryUserExercises.where('parameterIds', 'array-contains-any', parameterIds)
      }

      queryUserExercises = queryUserExercises.limit(exercisesLimit)
      exercises = await queryUserExercises.get()

      exercises.forEach((doc) => {
        document = JSON.parse(JSON.stringify(doc.data()))
        document['id'] = doc.id
        exercisesArr.push(document)
      })
    }
    const responseArr = [...defaultExercisesArr, ...exercisesArr]

    console.log("response")
    console.log(responseArr)

    return successResponse('Exercises filtered successfully', responseArr)
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const useExercise = async (exerciseData: any, workoutId: string, blockId: string, exerciseId: string) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    exerciseData = JSON.parse(JSON.stringify(exerciseData));
    const newExerciseId = exercisesCollection.doc().id

    const newExerciseObj = {
      id: newExerciseId,
      status: 1,
      mainTitle: exerciseData.mainTitle,
      altTitle: exerciseData.altTitle,
      mainInstructions: exerciseData.mainInstructions,
      altInstructions: exerciseData.altInstructions,
      mainTechnicalYtLink: exerciseData.mainTechnicalYtLink,
      mainDemoYtLink: exerciseData.mainDemoYtLink,
      altTechnicalYtLink: exerciseData.altTechnicalYtLink,
      altImage: exerciseData.altImage,
      image: exerciseData.image,
      altDemoYtLink: exerciseData.altDemoYtLink,
      duration: exerciseData.duration, //seconds
      userId,
      addedInLibrary: 0,
      reps: exerciseData.reps,
      accepts: 'exercise',
      splitInterval: exerciseData.splitInterval, //seconds
      parameterIds: exerciseData.parameterIds,
      resistanceBandId: exerciseData.resistanceBandId,
      bodyWeightId: exerciseData.bodyWeightId,
      suspensionTrainerId: exerciseData.suspensionTrainerId,
      searchText: encodeURI(exerciseData.mainTitle),
      isDefault: 0, // 0 => Not Default  1 => Default
      type: exerciseData.type, // 1 => exercise 2 => rest 
      comboType: exerciseData.comboType, //0 => default nothing  3=> combo 4 => part of combo
      isUsed: 1, // 0 => not used   1 => used
      addInLibrary: 0,
      created: moment().unix(),
      modified: moment().unix(),
    }

    const useExerciseFunction = async () => {

      const exercise = await exercisesCollection.doc(exerciseId).get(),
        exerciseObj = JSON.parse(JSON.stringify(exercise.data()));



      await exercisesCollection.doc(newExerciseId).set({
        status: 1,
        mainTitle: exerciseObj.mainTitle,
        altTitle: exerciseObj.altTitle,
        mainInstructions: exerciseObj.mainInstructions,
        altInstructions: exerciseObj.altInstructions,
        mainTechnicalYtLink: exerciseObj.mainTechnicalYtLink,
        mainDemoYtLink: exerciseObj.mainDemoYtLink,
        altTechnicalYtLink: exerciseObj.altTechnicalYtLink,
        image: exerciseObj.image,
        altDemoYtLink: exerciseObj.altDemoYtLink,
        duration: exerciseObj.duration, //seconds
        userId,
        addedInLibrary: 0,
        reps: exerciseObj.reps,
        accepts: 'exercise',
        splitInterval: exerciseObj.splitInterval, //seconds
        parameterIds: exerciseObj.parameterIds,
        searchText: encodeURI(exerciseObj.mainTitle),
        isDefault: 0, // 0 => Not Default  1 => Default
        type: exerciseObj.type, // 1 => exercise 2 => rest 
        comboType: exerciseObj.comboType, //0 => default nothing  3=> combo 4 => part of combo
        isUsed: 1, // 0 => not used   1 => used
        addInLibrary: 0,
        resistanceBandId: exerciseObj.resistanceBandId,
        bodyWeightId: exerciseObj.bodyWeightId,
        suspensionTrainerId: exerciseObj.suspensionTrainerId,
        created: moment().unix(),
        modified: moment().unix(),
      })

      const exerciseOrders = await exercisesOrderCollection
        .where('blockId', '==', blockId)
        .where('userId', '==', userId)
        .get();

      let exerciseOrderId;

      exerciseOrders.forEach((doc) => {
        exerciseOrderId = doc.id
      })

      await exercisesOrderCollection.doc(exerciseOrderId).update({
        exerciseIds: firebase.firestore.FieldValue.arrayUnion(newExerciseId),
      })

      await workoutsCollection.doc(workoutId).update({
        modified: moment().unix(),
      })

    }

    useExerciseFunction()

    console.log("=====>", newExerciseObj);

    return successResponse('Exercise added successfully', newExerciseObj);

  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const groupComboExercises = async (blockObj: any, exerciseIds, workoutId: string = '', blockId: string = '') => {
  try {
    blockObj = JSON.parse(JSON.stringify(blockObj))
    const userId: any = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    if (!exerciseIds.length) {
      return errorResponse("Atltest one exercise is required")
    }

    if (!exerciseIds.length) {
      return errorResponse(3)
    }

    let exercise: any = await exercisesCollection.doc(exerciseIds[0]).get(),
      exerciseOrderId,
      exercisesOrder;

    exercise = exercise.data();

    const newExerciseId = exercisesCollection.doc().id

    const exerciseObj = {
      id: newExerciseId,
      status: 1,
      mainTitle: exercise.mainTitle,
      duration: "00:00",
      comboType: 3,
      userId,
      reps: 10,
      accepts: 'exercise',
      created: moment().unix(),
      modified: moment().unix(),
    }

    const combo = async (newExerciseId, exerciseObj) => {
      await exercisesCollection.doc(newExerciseId).set(exerciseObj)

      let batch = db.batch(),
        ref;

      exerciseIds.forEach(exerciseId => {
        ref = exercisesCollection.doc(exerciseId)
        batch.update(ref, "comboType", 4);
        batch.update(ref, "comboParentId", newExerciseId);
      })
      batch.commit()


      exercisesOrder = await exercisesOrderCollection
        .where('blockId', '==', blockId)
        .where('userId', '==', userId)
        .where('status', '==', 1)
        .get(),

        exercisesOrder.forEach((doc) => { exerciseOrderId = doc.id; })

      await exercisesOrderCollection.doc(exerciseOrderId).update({
        exerciseIds: firebase.firestore.FieldValue.arrayUnion(newExerciseId),
      })

      if (workoutId) {
        await workoutsCollection.doc(workoutId).update({
          modified: moment().unix(),
        })
      }
    }
    combo(newExerciseId, exerciseObj)

    let newExercises = []
    let comboExercises = []
    let duration = 0;
    blockObj.exercises.map((exer) => {
      if (exerciseIds.includes(exer.id)) {
        exer['comboParentId'] = newExerciseId
        exer['comboType'] = 4
        duration += moment.duration(`00:${exer['duration']}`).asSeconds();
        comboExercises.push(exer)
        console.log('Exercise', exer)
      } else {
        newExercises.push(exer)
      }
    })
    const exerciseIndex = blockObj.exercises.findIndex((item) => {
      return item.id === exerciseIds[0]
    });
    exerciseObj['comboExercises'] = comboExercises
    // moment.utc(duration*1000).format('mm:ss')
    exerciseObj['duration'] = moment.utc(duration * 1000).format('mm:ss');
    newExercises.splice(exerciseIndex, 0, exerciseObj)
    blockObj['exercises'] = newExercises
    console.log('blockObj', blockObj)
    return successResponse('success', blockObj)
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const copyExercise = async (exerciseObj: any, workoutId: string, blockId: string, exerciseId: string) => {
  try {
    exerciseObj = JSON.parse(JSON.stringify(exerciseObj))

    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const newExerciseId = exercisesCollection.doc().id;

    const copyExercise = async () => {
      let exercise: any = await exercisesCollection.doc(exerciseId).get(),
        exerciseOrderId;

      exercise = JSON.parse(JSON.stringify(exercise.data()))
      exercise['created'] = moment().unix()
      exercise['modified'] = moment().unix()
      exercise['addInLibrary'] = 0

      await exercisesCollection.doc(newExerciseId).set(exercise)

      const exerciseOrders = await exercisesOrderCollection
        .where('blockId', '==', blockId)
        .where('userId', '==', userId)
        .get()

      exerciseOrders.forEach((doc) => {
        exerciseOrderId = doc.id
      })

      await exercisesOrderCollection.doc(exerciseOrderId).update({
        exerciseIds: firebase.firestore.FieldValue.arrayUnion(newExerciseId),
      })

      if (workoutId) {
        await workoutsCollection.doc(workoutId).update({
          modified: moment().unix(),
        })
      }
    }
    copyExercise()

    exerciseObj['id'] = newExerciseId
    exerciseObj['created'] = moment().unix()
    exerciseObj['modified'] = moment().unix()
    exerciseObj['addInLibrary'] = 0

    console.log('*************************')
    console.log(exerciseObj)
    console.log('*************************')


    return successResponse('Copy created successfully', exerciseObj)
  } catch (error) {
    // console.log(error)
    return errorResponse(2)
  }
}

const unGroupComboExercises = async (blockObj: any, comboParentId: string, comboExerciseIds: string[], workoutId: string, blockId: string) => {
  try {
    blockObj = JSON.parse(JSON.stringify(blockObj))
    const unGroupExercises = async () => {
      const userId: any = await isUserAuthenticated()
      if (!userId) {
        return errorResponse('User is not authenticated')
      }

      let batch = db.batch(),
        reference;

      await exercisesCollection.doc(comboParentId).update({
        status: 0,
        modified: moment().unix()
      })

      comboExerciseIds.forEach(exerciseId => {
        reference = exercisesCollection.doc(exerciseId)
        batch.update(reference, "comboType", 0);
        batch.update(reference, "comboParentId", '');
      })
      batch.commit()

      if (workoutId) {
        await workoutsCollection.doc(workoutId).update({
          modified: moment().unix(),
        })
      }
    }
    unGroupExercises();

    const comboExercise = blockObj.exercises.find(exer => exer.id == comboParentId)

    let exercises = []
    comboExercise.comboExercises.forEach((exer) => {
      exer.comboParentId = ""
      exer.comboType = 0
      exercises.push(exer)
    })

    blockObj.exercises = blockObj.exercises.filter(
      (exer) => exer.id !== comboParentId
    )

    blockObj.exercises.push(...exercises)

    console.log(blockObj)

    return successResponse('success', blockObj)
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const fetchYoutubeData = async (searchText: string = 'workout', maxResults = 25, specificChannel = true) => {
  try {
    const userId: any = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    let channelId,
      apiKey = 'AIzaSyBTzRzD1PDMk6dv-QygPFxGOgmBzm1enSs',
      videos = [],
      url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchText}&key=${apiKey}`;

    if (specificChannel) {
      let adminConfigurations = await adminConfigurationsCollection.get();
      adminConfigurations.forEach(adminConfiguration => {
        let configuration: any = adminConfiguration;
        channelId = configuration.YtChannelId || 'UCo_q6aOlvPH7M-j_XGWVgXg';
      });
      url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&q=${searchText}&key=${apiKey}`;
    }

    let response = await axios({
      method: 'get',
      url,
    });

    if (response.data && response.data.items && response.data.items.length) {
      response?.data?.items.forEach(item => {
        videos.push({
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoTitle: `${item.snippet.title}`,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          videoThumbnails: item.snippet.thumbnails,
          description: item.snippet.description,
          liveBroadcastContent: item.snippet.liveBroadcastContent,
          publishTime: item.snippet.publishTime,
          publishedAt: item.snippet.publishedAt
        })
      })
    }

    return successResponse('Response fetched successfully', videos)

  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

export {
  newExercise,
  editExercise,
  fetchExercise,
  deleteExercise,
  useExercise,
  unGroupComboExercises,
  newExerciseRest,
  fetchExercises,
  deleteRest,
  editRest,
  exercisesSaveIt,
  sortExercises,
  filterExercise,
  groupComboExercises,
  copyExercise,
  fetchYoutubeData,
  newCustomExercise
}




