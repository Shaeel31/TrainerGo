import { db } from '../firebase/index'
import { storage } from '../firebase/index'
import moment from 'moment'
import firebase from 'firebase/app'
import { isUserAuthenticated } from './authServices'
import { errorResponse, successResponse } from './commonServices'
import { TotalTime } from './../screens/RemoteScreen/styled';
let storageRef = storage.ref();

const workoutsCollection = db.collection('workouts'),
  colorsCollection = db.collection('colors'),
  usersCollection = db.collection('users'),
  blocksCollection = db.collection('blocks'),
  exercisesCollection = db.collection('exercises'),
  exercisesOrderCollection = db.collection('exercisesOrder'),
  blocksOrderCollection = db.collection('blocksOrder'),
  soundsCollection = db.collection('sounds');

const fetchWorkouts = async (limit: number, searchText = '', sort = 0) => {
  try {
    limit = 100;
    const userId = await isUserAuthenticated(),
      defaultWorkoutsArr = [],
      workoutsArr = [];

    let workoutsLimit,
      workouts,
      query,
      queryUserWorkouts,
      document;

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    query = workoutsCollection
    query = query.where('status', '==', 1)
    query = query.where('isDefault', '==', 1)
    query = query.where('addInLibrary', '==', 1)

    switch (sort) {
      case 1:
        query = query.orderBy('searchTitle', 'asc');
        break;
      case 2:
        query = query.orderBy('created', 'desc');
        break;
    }

    if (searchText) {
      query = query.orderBy('searchTitle')
      query = query.startAt(encodeURI(searchText.toLowerCase()))
      query = query.endBefore(encodeURI(searchText.toLowerCase()) + '~')
    }
    query = query.limit(limit)
    const defaultWorkouts = await query.get()

    defaultWorkouts.forEach((doc) => {
      document = JSON.parse(JSON.stringify(doc.data()))
      document['id'] = doc.id
      defaultWorkoutsArr.push(document)
    })

    if (
      defaultWorkouts.size == 0 ||
      Math.abs(defaultWorkouts.size - limit) < limit
    ) {
      workoutsLimit = Math.abs(defaultWorkouts.size - limit)

      queryUserWorkouts = await workoutsCollection
      queryUserWorkouts = queryUserWorkouts.where('status', '==', 1)
      queryUserWorkouts = queryUserWorkouts.where('isDefault', '==', 0)
      queryUserWorkouts = queryUserWorkouts.where('addInLibrary', '==', 1)
      queryUserWorkouts = queryUserWorkouts.where('userId', '==', userId)

      switch (sort) {
        case 1:
          queryUserWorkouts = queryUserWorkouts.orderBy('title', 'asc');
          break;
        case 2:
          queryUserWorkouts = queryUserWorkouts.orderBy('created', 'desc');
          break;
      }

      if (searchText) {

        queryUserWorkouts = queryUserWorkouts.orderBy('searchTitle')
        queryUserWorkouts = queryUserWorkouts.startAt(
          encodeURI(searchText.toLowerCase())
        )
        queryUserWorkouts = queryUserWorkouts.endBefore(
          encodeURI(searchText.toLowerCase()) + '~'
        )
      }
      queryUserWorkouts = queryUserWorkouts.limit(workoutsLimit)
      workouts = await queryUserWorkouts.get()

      workouts.forEach((doc) => {
        document = JSON.parse(JSON.stringify(doc.data()))
        document['id'] = doc.id
        workoutsArr.push(document)
      })
    }
    const responseArr = [...defaultWorkoutsArr, ...workoutsArr]

    return successResponse('Workouts fetched successfully', responseArr)
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const fetchWorkout = async (workoutId: string) => {
  try {
    const userId = await isUserAuthenticated()
    let workout

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    workout = await workoutsCollection.doc(workoutId).get()
    workout = JSON.parse(JSON.stringify(workout.data()))
    workout.exerciseColor = await colorsCollection
      .doc(workout.exerciseColorId)
      .get()
    workout.exerciseSound = await soundsCollection
      .doc(workout.exerciseSoundId)
      .get()
    workout.restColor = await colorsCollection.doc(workout.restColorId).get()
    workout.restSound = await soundsCollection.doc(workout.restSoundId).get()

    workout.exerciseColor = workout.exerciseColor.data()
    workout.exerciseSound = workout.exerciseSound.data()
    workout.restColor = workout.restColor.data()
    workout.restSound = workout.restSound.data()

    return successResponse('Workout fetched successfully', workout)
  } catch (error) {
    return errorResponse(2)
  }
}

const deleteWorkout = async (workoutId: string) => {
  try {
    const userId: any = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    //   await usersCollection.doc(userId).update({ activeWorkout: null })

    await workoutsCollection.doc(workoutId).update({
      status: 0,
      modified: moment().unix(),
    })

    return successResponse('Workout deleted successfully')
  } catch (error) {
    return errorResponse(2)
  }
}

const editWorkout = async (workoutId: string, title: string) => {
  try {
    const userId = await isUserAuthenticated()

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    await workoutsCollection.doc(workoutId).update({
      title,
      searchTitle: encodeURI(title.toLowerCase()),
      modified: moment().unix(),
    })

    return successResponse('Workout edited successfully')
  } catch (error) {
    return errorResponse(2)
  }
}

const newWorkout = async (title: string = '') => {
  try {
    const userId: any = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const newWorkoutId = workoutsCollection.doc().id;

    const workObj = {
      id: newWorkoutId,
      isDefault: 0, // 0 => Not Default(Users)  1 => Default(Admin)
      status: 1,
      title,
      searchTitle: encodeURI(title.toLowerCase()),
      userId,
      volume: 0,
      preparationTime: 0,
      ticks: 0,
      isUsed: 1,
      accepts: 'workout',
      addedInLibrary: 0,
      image: '',
      exerciseSoundId: '',
      exerciseColorId: '',
      restSoundId: '',
      restColorId: '',
      addInLibrary: 0, // 0 => not add in library  1 => Add in library
      created: moment().unix(),
      modified: moment().unix(),
    }
    const addWorkout = async (newWorkoutId, obj) => {
      try {
        await workoutsCollection.doc(newWorkoutId).set(obj)

        await usersCollection.doc(obj.userId).update({ activeWorkout: newWorkoutId })

        const newBlockOrderId = blocksOrderCollection.doc().id
        await blocksOrderCollection.doc(newBlockOrderId).set({
          blockIds: [],
          status: 1,
          userId: obj.userId,
          workoutId: newWorkoutId,
          created: moment().unix(),
          modified: moment().unix(),
        })
      } catch (error) {
        return errorResponse(2)
      }
    }

    addWorkout(newWorkoutId, workObj)

    return successResponse('Workout created successfully', workObj)
  } catch (error) {
    return errorResponse(2)
  }
}


const workoutSettings = async (
  workoutId: string,
  volume: number,
  preparationTime: number,
  ticks: number,
  restColorId: string,
  exerciseSoundId: string,
  exerciseColorId: string,
  restSoundId: string,
  image: any
) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    if (!image || image.slice(0, 5) == "https") {
      await workoutsCollection.doc(workoutId).update({
        volume: volume || 0,
        preparationTime: preparationTime || 0,
        ticks: ticks || 0,
        exerciseSoundId: exerciseSoundId || "",
        exerciseColorId: exerciseColorId || "",
        restSoundId: restSoundId || "",
        restColorId: restColorId || "",
        image: image || "",
        modified: moment().unix(),
      })
      return successResponse('Workout created successfully')
    }

    let workoutImagePath = `workout/${moment().unix()}.${image.slice(11, 21).split(";")[0]}`,
      imageRef = storageRef.child(workoutImagePath);

    image = image.split(",")[1];
    imageRef.putString(image, 'base64').then((snapshot) => {

      snapshot.ref.getDownloadURL().then(async (imageUrl) => {
        await workoutsCollection.doc(workoutId).update({
          volume: volume || 0,
          preparationTime: preparationTime || 0,
          ticks: ticks || 0,
          exerciseSoundId: exerciseSoundId || "",
          exerciseColorId: exerciseColorId || "",
          restSoundId: restSoundId || "",
          restColorId: restColorId || "",
          image: imageUrl || "",
          modified: moment().unix(),
        })
      });
    });
    return successResponse('Workout created successfully')


  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const fetchUsedWorkouts = async (workoutId: string) => {
  try {
    const userId: any = await isUserAuthenticated();
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    if (!workoutId) {
      return successResponse('Workout id is undefined', null)
    }

    let workout = await workoutsCollection.doc(workoutId).get(),
      blockIdsArr = [],
      blockIndex,
      blockObj: any = {},
      blocksArr = [],
      newBlocksArr = [],
      blockIdsSortDict = {},
      exerciseIdsArr = [],
      exerciseIndex,
      newFetchedExercisesArr,
      exerciseObj: any = {},
      exercisesArr = [],
      exerciseIdsSortDict = {},
      totalTime = 0,
      totalBlocks = 0,
      totalExercises = 0,
      exerciseTotalTime = 0,
      workoutData = JSON.parse(JSON.stringify(workout.data() || {}));
    workoutData.id = workout.id;

    if (workoutData.userId != userId) {
      return successResponse('Wrong workout id sent', null)
    }

    if (workoutData.status == 0) {
      workoutData = {};
      return successResponse('Workout fetched successfully', workoutData)
    }

    if (workoutData.isUsed == 0) {
      const newWorkoutId = workoutsCollection.doc().id;
      await workoutsCollection.doc(newWorkoutId).set({
        isDefault: 0, // 0 => Not Default  1 => Default
        status: 1,
        title: workoutData.title || '',
        searchTitle: workoutData.searchTitle || '',
        userId,
        volume: workoutData.volume || 0,
        preparationTime: workoutData.preparationTime || 0,
        ticks: workoutData.ticks || 0,
        isUsed: 1,
        parentWorkout: workoutId,
        image: workoutData.image || '',
        exerciseSoundId: workoutData.exerciseSoundId || '',
        exerciseColorId: workoutData.exerciseColorId || '',
        restSoundId: workoutData.restSoundId || '',
        restColorId: workoutData.restColorId || '',
        created: moment().unix(),
        modified: moment().unix(),
      })

      let newBlockOrderId = blocksOrderCollection.doc().id

      const oldblockOrders = await blocksOrderCollection //fetching old block orders
        .where('workoutId', '==', workoutId)
        .where('userId', '==', userId)
        .get();

      let blockIds,
        newBlocks,
        newBlockId,
        blockIdsDict = {},
        batch = db.batch(),
        newBlockIds = [],
        newExerciseOrderId = exercisesOrderCollection.doc().id;

      oldblockOrders.forEach((doc) => {
        blockIds = doc.data().blockIds;
      })   //fetching old block orders Ids

      for (let i = 0; i < blockIds.length; i = i + 10) {
        newBlocks = await blocksCollection
          .where('status', '==', 1)
          .where(
            firebase.firestore.FieldPath.documentId(),
            'in',
            blockIds.slice(i, i + 10)
          )
          .get();

        if (newBlocks?.size) {
          newBlocks.forEach((block) => {
            newBlockId = blocksCollection.doc().id

            blockIdsDict[block.id] = newBlockId
            newBlockIds.push(newBlockId)

            var docRef = blocksCollection.doc(newBlockId); //automatically generate unique id
            batch.set(docRef, block.data());

          })
        }
      }
      batch.commit();

      await blocksOrderCollection.doc(newBlockOrderId).set({
        blockIds: newBlockIds,
        status: 1,
        userId,
        workoutId: newWorkoutId,
        created: moment().unix(),
        modified: moment().unix(),
      })

      for (const blockId of blockIds) {
        let exercisesOrder = await exercisesOrderCollection
          .where('blockId', '==', blockId)
          .where('userId', '==', userId)
          .where('status', '==', 1)
          .get(),
          newExerciseOrderId = exercisesOrderCollection.doc().id;

        let exerciseOrderObj = {},
          exerciseIdsArr = [];

        exercisesOrder.forEach(exerciseOrder => {
          exerciseOrderObj = exerciseOrder.data()
          exerciseIdsArr = exerciseOrderObj['exerciseIds']
        })
        let exercises,
          batch = db.batch(),
          newExercisesIds = [];

        for (let i = 0; i < exerciseIdsArr.length; i = i + 10) {
          exercises = await exercisesCollection
            .where('status', '==', 1)
            .where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              exerciseIdsArr.slice(i, i + 10)
            )
            .get();

          if (exercises?.size) {
            exercises.forEach((exercise) => {
              const newExerciseId = exercisesCollection.doc().id
              newExercisesIds.push(newExerciseId)
              var docRef = exercisesCollection.doc(newExerciseId); //automatically generate unique id
              batch.set(docRef, exercise.data());
            })
          }
        }
        batch.commit();

        exerciseOrderObj['blockId'] = blockIdsDict[blockId];
        exerciseOrderObj['exerciseIds'] = newExercisesIds;

        if (exerciseOrderObj['blockId']) {
          await exercisesOrderCollection.doc(newExerciseOrderId).set(exerciseOrderObj)
        }
      }

      workout = await workoutsCollection.doc(newWorkoutId).get();
      workoutData = JSON.parse(JSON.stringify(workout.data() || {}));
      workoutData.id = workout.id;
      await usersCollection.doc(userId).update({ activeWorkout: newWorkoutId })
      await workoutsCollection.doc(workoutId).update({
        modified: moment().unix(),
      })
    }

    const workoutBlocks = await blocksOrderCollection
      .where('workoutId', '==', workoutId)
      .where('userId', '==', userId)
      .where('status', '==', 1)
      .get();

    workoutBlocks.forEach((workoutBlock) => {
      blockIdsSortDict = {};
      blockIdsArr = workoutBlock.data().blockIds;
      blockIndex = 0;
      blockIdsArr.forEach(blockId => {
        blockIdsSortDict[blockId] = blockIndex;
        blockIndex++;
      })
    })

    for (let i = 0; i < blockIdsArr.length; i = i + 10) {
      const blocks = await blocksCollection
        .where('status', '==', 1)
        .where(
          firebase.firestore.FieldPath.documentId(),
          'in',
          blockIdsArr.slice(i, i + 10)
        ).get();

      blocks.forEach((block) => {
        totalBlocks = totalBlocks + 1;
        blockObj = block.data();
        if (blockObj.duration > 0) {
          blockObj.duration = moment.utc(blockObj.duration * 1000).format('mm:ss');
        }
        blockObj['id'] = block.id;
        blocksArr.push(blockObj)

      })
    }

    newBlocksArr = new Array(blocksArr.length).fill(0);

    blocksArr.forEach((block) => {
      newBlocksArr[blockIdsSortDict[block.id]] = block
    })
    newBlocksArr = newBlocksArr.filter(x => x !== 0)

    blocksArr = newBlocksArr;
    workoutData.blocks = blocksArr;
    let restTotalTime = 0;
    for (const block of blocksArr) {

      if (block.type == 2) {
        let timeArr = exerciseObj.duration.split(':');
        restTotalTime += parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
        continue;
      }
      const blockExercises = await exercisesOrderCollection
        .where('blockId', '==', block.id)
        .where('userId', '==', userId)
        .where('status', '==', 1)
        .get();

      blockExercises.forEach((blockExercise) => {
        exerciseIdsSortDict = {};
        exerciseIdsArr = [];
        exerciseIdsArr = blockExercise.data().exerciseIds;
        exerciseIndex = 0;
        exerciseIdsArr.forEach(exerciseId => {
          exerciseIdsSortDict[exerciseId] = exerciseIndex;
          exerciseIndex++;
        })
      })

      let exercises,
        fetchedExercisesObj = [],
        fetchedExercisesArr = [];
      exercisesArr = [];
      exerciseTotalTime = 0;

      for (let i = 0; i < exerciseIdsArr.length; i = i + 10) {
        exercises = await exercisesCollection
          .where('status', '==', 1)
          .where(
            firebase.firestore.FieldPath.documentId(),
            'in',
            exerciseIdsArr.slice(i, i + 10)
          )
          .get();

        exercises.forEach((exercise) => {
          fetchedExercisesObj = exercise.data()
          fetchedExercisesObj['id'] = exercise.id
          fetchedExercisesArr.push(fetchedExercisesObj)
        })
      }

      if (fetchedExercisesArr && fetchedExercisesArr.length) {

        newFetchedExercisesArr = new Array(fetchedExercisesArr.length).fill(0);
        fetchedExercisesArr.forEach((exercise) => {
          newFetchedExercisesArr[exerciseIdsSortDict[exercise.id]] = exercise
        })
        newFetchedExercisesArr = newFetchedExercisesArr.filter(x => x !== 0);

        fetchedExercisesArr = newFetchedExercisesArr;

        fetchedExercisesArr.forEach((exercise) => {
          exerciseObj = {};
          totalExercises = totalExercises + 1;
          exerciseObj = exercise;
          exerciseObj['id'] = exercise.id;

          if (typeof (exerciseObj.duration) == 'string') {
            let timeArr = exerciseObj.duration.split(':');
            exerciseObj.duration = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
          }
          exerciseTotalTime = exerciseTotalTime + exerciseObj.duration;

          if (exerciseObj.comboType == 3) {
            if (exerciseObj.comboType == 3) {
              exerciseObj.comboExercises = [];
              exerciseObj.duration = moment.utc(exerciseObj.duration * 1000).format('mm:ss')
              exercisesArr.push(exerciseObj);
            }
            let comboExerciseTime = 0;

            fetchedExercisesArr.forEach((exerciseData) => {

              if (exerciseData.comboType == 4 && exerciseData.comboParentId == exerciseObj.id) {

                let comboExerciseObj = exerciseData
                comboExerciseObj['id'] = exerciseData.id;

                comboExerciseTime = comboExerciseTime + comboExerciseObj.duration
                exerciseObj['duration'] = moment.utc(comboExerciseTime * 1000).format('mm:ss')
                comboExerciseObj.duration = moment.utc(comboExerciseObj.duration * 1000).format('mm:ss')

                exerciseObj.comboExercises.push(comboExerciseObj)
              }
            })

          }
          if (exerciseObj.comboType == 0) {
            exerciseObj.duration = moment.utc(exerciseObj.duration * 1000).format('mm:ss')
            exercisesArr.push(exerciseObj)
          }
        })
      }
      block.duration = exerciseTotalTime
      block.exerciseTotalTime = moment.utc(exerciseTotalTime * (1000 * block.rounds)).format('mm:ss');
      totalTime = totalTime + exerciseTotalTime * (block.rounds || 0);
      block.exercises = exercisesArr;
    }
    totalTime = totalTime + restTotalTime;
    workoutData.totalTime = moment.utc(totalTime * 1000).format('HH:mm:ss');
    workoutData.totalBlocks = totalBlocks;
    workoutData.totalExercises = totalExercises;


    console.log("***********************Fetched Workspace Data***********************")
    console.log(workoutData)
    console.log("********************************************************************")

    return successResponse('Workout fetched successfully', workoutData)

  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const workoutsSaveIt = async (workoutObj: any, workoutId: string, type: number) => {
  try {
    workoutObj = JSON.parse(JSON.stringify(workoutObj))
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const saveWorkout = async () => {
      if (type == 0) {
        let workout: any = await workoutsCollection.doc(workoutId).get()
        workout = JSON.parse(JSON.stringify(workout.data()))
        workout['addInLibrary'] = 1
        workout['addedInLibrary'] = 1
        workout['created'] = moment().unix()
        workout['modified'] = moment().unix()
        workout['isUsed'] = 0
        workout['accepts'] = 'workout'
        const newWorkoutId = workoutsCollection.doc().id
        await workoutsCollection.doc(newWorkoutId).set(workout)
        let newBlockOrderId = blocksOrderCollection.doc().id

        const oldblockOrders = await blocksOrderCollection //fetching old block orders
          .where('workoutId', '==', workoutId)
          .where('userId', '==', userId)
          .get();

        let blockIds,
          newBlocks,
          newBlockId,
          blockIdsDict = {},
          batch = db.batch(),
          newBlockIds = [],
          newExerciseOrderId = exercisesOrderCollection.doc().id;

        oldblockOrders.forEach((doc) => {
          blockIds = doc.data().blockIds;


        })   //fetching old block orders Ids
        for (let i = 0; i < blockIds.length; i = i + 10) {
          newBlocks = await blocksCollection
            .where('status', '==', 1)
            .where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              blockIds.slice(i, i + 10)
            )
            .get();

          if (newBlocks?.size) {
            newBlocks.forEach((block) => {
              newBlockId = blocksCollection.doc().id
              blockIdsDict[block.id] = newBlockId
              newBlockIds.push(newBlockId)
              var docRef = blocksCollection.doc(newBlockId); //automatically generate unique id
              batch.set(docRef, block.data());

            })
          }
        }
        batch.commit();

        await blocksOrderCollection.doc(newBlockOrderId).set({
          blockIds: newBlockIds,
          status: 1,
          userId,
          workoutId: newWorkoutId,
          created: moment().unix(),
          modified: moment().unix(),
        })

        for (const blockId of blockIds) {
          let exercisesOrder = await exercisesOrderCollection
            .where('blockId', '==', blockId)
            .where('userId', '==', userId)
            .where('status', '==', 1)
            .get(),
            newExerciseOrderId = exercisesOrderCollection.doc().id;

          let exerciseOrderObj = {},
            exerciseIdsArr = [];

          exercisesOrder.forEach(exerciseOrder => {

            exerciseOrderObj = exerciseOrder.data()
            exerciseIdsArr = exerciseOrderObj['exerciseIds']
          })
          let exercises,
            batch = db.batch(),
            exercisesArr = [],
            exercisesObj = {},
            newExercisesIds = [];

          for (let i = 0; i < exerciseIdsArr.length; i = i + 10) {

            exercises = await exercisesCollection
              .where('status', '==', 1)
              .where(
                firebase.firestore.FieldPath.documentId(),
                'in',
                exerciseIdsArr.slice(i, i + 10)
              )
              .get();
            exercisesArr.push()

            exercises.forEach((exercise) => {
              exercisesObj = exercise.data()
              exercisesObj['id'] = exercise.id
              exercisesArr.push(exercisesObj)
            })

          }

          let newFetchedExercisesArr = new Array(exercisesArr.length).fill(0);
          exercisesArr.forEach((exercise) => {
            newFetchedExercisesArr[exerciseIdsArr.findIndex((element) => element == exercise.id)] = exercise
          })
          newFetchedExercisesArr = newFetchedExercisesArr.filter((element) => element !== 0)
          exercisesArr = newFetchedExercisesArr;

          let newExerciseId;
          if (exercisesArr && exercisesArr.length) {

            exercisesArr.forEach((exercise) => {
              exercise.created = moment().unix();

              if (exercise.comboType == 3) {
                let newParentExerciseId = exercisesCollection.doc().id
                if (exercise.comboType == 3) {
                  newExercisesIds.push(newParentExerciseId)
                  var docRef = exercisesCollection.doc(newParentExerciseId);
                  batch.set(docRef, exercise);
                }

                exercisesArr.forEach((exerciseData) => {
                  if (exerciseData.comboType == 4 && exerciseData.comboParentId == exercise.id) {

                    exerciseData.created = moment().unix();
                    newExerciseId = exercisesCollection.doc().id
                    newExercisesIds.push(newExerciseId)
                    exerciseData.comboParentId = newParentExerciseId

                    var docRef = exercisesCollection.doc(newExerciseId);
                    batch.set(docRef, exerciseData);
                  }
                })

              } else if (exercise.comboType == 0) {
                newExerciseId = exercisesCollection.doc().id
                newExercisesIds.push(newExerciseId)
                var docRef = exercisesCollection.doc(newExerciseId);
                batch.set(docRef, exercise);
              }
            })
          }
          batch.commit();

          exerciseOrderObj['blockId'] = blockIdsDict[blockId];
          exerciseOrderObj['exerciseIds'] = newExercisesIds;


          if (exerciseOrderObj['blockId']) {
            await exercisesOrderCollection.doc(newExerciseOrderId).set(exerciseOrderObj)
          }

        }
        await workoutsCollection.doc(workoutId).update({ parentWorkout: newWorkoutId, addedInLibrary: 1 })

      } else if (type == 1) {
        let workout: any = await workoutsCollection.doc(workoutId).get()
        workout = JSON.parse(JSON.stringify(workout.data()))
        workout['addInLibrary'] = 1
        workout['addedInLibrary'] = 1
        workout['isUsed'] = 0
        workout['created'] = moment().unix()
        workout['modified'] = moment().unix()
        workout['accepts'] = 'workout'
        await workoutsCollection.doc(workout.parentWorkout).update(workout)

        let blockIds = [],
          parentBlockOrderId;
        const blockOrders = await blocksOrderCollection //fetching old block orders
          .where('workoutId', '==', workoutId)
          .where('userId', '==', userId)
          .get(),
          parentBlockOrders = await blocksOrderCollection //fetching old block orders
            .where('workoutId', '==', workout.parentWorkout)
            .where('userId', '==', userId)
            .get();

        blockOrders.forEach((doc) => { blockIds = doc.data().blockIds; })
        parentBlockOrders.forEach((doc) => { parentBlockOrderId = doc.id; })

        let
          newBlocks,
          newBlockId,
          blockIdsDict = {},
          batch = db.batch(),
          newBlockIds = [],
          newExerciseOrderId = exercisesOrderCollection.doc().id;

        for (let i = 0; i < blockIds.length; i = i + 10) {
          newBlocks = await blocksCollection
            .where('status', '==', 1)
            .where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              blockIds.slice(i, i + 10)
            )
            .get();

          if (newBlocks?.size) {
            newBlocks.forEach((block) => {
              newBlockId = blocksCollection.doc().id

              blockIdsDict[block.id] = newBlockId
              newBlockIds.push(newBlockId)

              var docRef = blocksCollection.doc(newBlockId); //automatically generate unique id
              batch.set(docRef, block.data());

            })
          }

        }
        batch.commit();

        await blocksOrderCollection.doc(parentBlockOrderId).update({
          blockIds: blockIds
        })

        for (const blockId of blockIds) {
          let exercisesOrder = await exercisesOrderCollection
            .where('blockId', '==', blockId)
            .where('userId', '==', userId)
            .where('status', '==', 1)
            .get(),
            newExerciseOrderId = exercisesOrderCollection.doc().id;

          let exerciseOrderObj = {},
            exerciseIdsArr = [];

          exercisesOrder.forEach(exerciseOrder => {

            exerciseOrderObj = exerciseOrder.data()
            exerciseIdsArr = exerciseOrderObj['exerciseIds']
          })
          let exercises,
            batch = db.batch(),
            exercisesArr = [],
            exercisesObj = {},
            newExercisesIds = [];

          for (let i = 0; i < exerciseIdsArr.length; i = i + 10) {

            exercises = await exercisesCollection
              .where('status', '==', 1)
              .where(
                firebase.firestore.FieldPath.documentId(),
                'in',
                exerciseIdsArr.slice(i, i + 10)
              )
              .get();
            exercisesArr.push()

            exercises.forEach((exercise) => {
              exercisesObj = exercise.data()
              exercisesObj['id'] = exercise.id
              exercisesArr.push(exercisesObj)
            })

          }

          let newFetchedExercisesArr = new Array(exercisesArr.length).fill(0);
          exercisesArr.forEach((exercise) => {
            newFetchedExercisesArr[exerciseIdsArr.findIndex((element) => element == exercise.id)] = exercise
          })
          newFetchedExercisesArr = newFetchedExercisesArr.filter((element) => element !== 0)

          exercisesArr = newFetchedExercisesArr;

          let newExerciseId;
          if (exercisesArr && exercisesArr.length) {

            exercisesArr.forEach((exercise) => {
              exercise.created = moment().unix();

              if (exercise.comboType == 3) {
                let newParentExerciseId = exercisesCollection.doc().id
                if (exercise.comboType == 3) {
                  newExercisesIds.push(newParentExerciseId)
                  var docRef = exercisesCollection.doc(newParentExerciseId);
                  batch.set(docRef, exercise);
                }

                exercisesArr.forEach((exerciseData) => {
                  if (exerciseData.comboType == 4 && exerciseData.comboParentId == exercise.id) {

                    exerciseData.created = moment().unix();
                    newExerciseId = exercisesCollection.doc().id
                    newExercisesIds.push(newExerciseId)
                    exerciseData.comboParentId = newParentExerciseId

                    var docRef = exercisesCollection.doc(newExerciseId);
                    batch.set(docRef, exerciseData);
                  }
                })

              } else if (exercise.comboType == 0) {
                newExerciseId = exercisesCollection.doc().id
                newExercisesIds.push(newExerciseId)
                var docRef = exercisesCollection.doc(newExerciseId);
                batch.set(docRef, exercise);
              }
            })
          }
          batch.commit();

          exerciseOrderObj['blockId'] = blockIdsDict[blockId]
          exerciseOrderObj['exerciseIds'] = newExercisesIds

          console.log("===========================================================")
          console.log(exerciseOrderObj)
          console.log("============================================================")

          if (exerciseOrderObj['blockId']) {
            await exercisesOrderCollection.doc(newExerciseOrderId).set(exerciseOrderObj)
          }
        }

      } else if (type == 2) {
        let workout: any = await workoutsCollection.doc(workoutId).get()
        workout = JSON.parse(JSON.stringify(workout.data()))
        workout['addInLibrary'] = 1
        workout['addedInLibrary'] = 1
        workout['created'] = moment().unix()
        workout['modified'] = moment().unix()
        workout['title'] = `${workout['title']}-Copy`
        workout['accepts'] = 'workout'
        workout['isUsed'] = 0

        const newWorkoutId = workoutsCollection.doc().id
        await workoutsCollection.doc(newWorkoutId).set(workout)

        let newBlockOrderId = blocksOrderCollection.doc().id

        const oldblockOrders = await blocksOrderCollection //fetching old block orders
          .where('workoutId', '==', workoutId)
          .where('userId', '==', userId)
          .get();

        let blockIds,
          newBlocks,
          newBlockId,
          blockIdsDict = {},
          batch = db.batch(),
          newBlockIds = [],
          newExerciseOrderId = exercisesOrderCollection.doc().id;

        oldblockOrders.forEach((doc) => {
          blockIds = doc.data().blockIds;
        })   //fetching old block orders Ids

        for (let i = 0; i < blockIds.length; i = i + 10) {
          newBlocks = await blocksCollection
            .where('status', '==', 1)
            .where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              blockIds.slice(i, i + 10)
            )
            .get();

          if (newBlocks?.size) {
            newBlocks.forEach((block) => {
              newBlockId = blocksCollection.doc().id

              blockIdsDict[block.id] = newBlockId
              newBlockIds.push(newBlockId)

              var docRef = blocksCollection.doc(newBlockId); //automatically generate unique id
              batch.set(docRef, block.data());

            })
          }

        }
        batch.commit();

        await blocksOrderCollection.doc(newBlockOrderId).set({
          blockIds: newBlockIds,
          status: 1,
          userId,
          workoutId: newWorkoutId,
          created: moment().unix(),
          modified: moment().unix(),
        })

        for (const blockId of blockIds) {
          let exercisesOrder = await exercisesOrderCollection
            .where('blockId', '==', blockId)
            .where('userId', '==', userId)
            .where('status', '==', 1)
            .get(),

            newExerciseOrderId = exercisesOrderCollection.doc().id;

          let exerciseOrderObj = {},
            exerciseIdsArr = [];

          exercisesOrder.forEach(exerciseOrder => {

            exerciseOrderObj = exerciseOrder.data()
            exerciseIdsArr = exerciseOrderObj['exerciseIds']
          })
          let exercises,
            batch = db.batch(),
            exercisesArr = [],
            exercisesObj = {},
            newExercisesIds = [];

          for (let i = 0; i < exerciseIdsArr.length; i = i + 10) {

            exercises = await exercisesCollection
              .where('status', '==', 1)
              .where(
                firebase.firestore.FieldPath.documentId(),
                'in',
                exerciseIdsArr.slice(i, i + 10)
              )
              .get();
            exercisesArr.push()

            exercises.forEach((exercise) => {
              exercisesObj = exercise.data()
              exercisesObj['id'] = exercise.id
              exercisesArr.push(exercisesObj)
            })

          }

          let newFetchedExercisesArr = new Array(exercisesArr.length).fill(0);
          exercisesArr.forEach((exercise) => {
            newFetchedExercisesArr[exerciseIdsArr.findIndex((element) => element == exercise.id)] = exercise
          })
          newFetchedExercisesArr = newFetchedExercisesArr.filter((element) => element !== 0)

          exercisesArr = newFetchedExercisesArr;

          let newExerciseId;
          if (exercisesArr && exercisesArr.length) {

            exercisesArr.forEach((exercise) => {
              exercise.created = moment().unix();

              if (exercise.comboType == 3) {
                let newParentExerciseId = exercisesCollection.doc().id
                if (exercise.comboType == 3) {
                  newExercisesIds.push(newParentExerciseId)
                  var docRef = exercisesCollection.doc(newParentExerciseId);
                  batch.set(docRef, exercise);
                }

                exercisesArr.forEach((exerciseData) => {
                  if (exerciseData.comboType == 4 && exerciseData.comboParentId == exercise.id) {

                    exerciseData.created = moment().unix();
                    newExerciseId = exercisesCollection.doc().id
                    newExercisesIds.push(newExerciseId)
                    exerciseData.comboParentId = newParentExerciseId

                    var docRef = exercisesCollection.doc(newExerciseId);
                    batch.set(docRef, exerciseData);
                  }
                })

              } else if (exercise.comboType == 0) {
                newExerciseId = exercisesCollection.doc().id
                newExercisesIds.push(newExerciseId)
                var docRef = exercisesCollection.doc(newExerciseId);
                batch.set(docRef, exercise);
              }
            })
          }
          batch.commit();

          exerciseOrderObj['blockId'] = blockIdsDict[blockId];
          exerciseOrderObj['exerciseIds'] = newExercisesIds;
          if (exerciseOrderObj['blockId']) {
            await exercisesOrderCollection.doc(newExerciseOrderId).set(exerciseOrderObj)
          }
        }
      }
    }
    saveWorkout()

    if (type == 0) {
      workoutObj['addInLibrary'] = 1
      workoutObj['addedInLibrary'] = 1
      workoutObj['isUsed'] = 0
    } else if (type == 1) {
      workoutObj['addInLibrary'] = 1
      workoutObj['addedInLibrary'] = 1
      workoutObj['isUsed'] = 0
    } else if (type == 2) {
      workoutObj['addInLibrary'] = 1
      workoutObj['addedInLibrary'] = 1
      workoutObj['isUsed'] = 0

    }

    console.log('*********************')
    console.log(workoutObj)
    console.log('*********************')

    return successResponse('success', workoutObj)
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const saveItWorkoutData = async (workoutObj: any, workoutId: string) => {
  try {
    workoutObj = JSON.parse(JSON.stringify(workoutObj))
    const userId = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }


    let blocks = workoutObj.blocks || [];

    let blockOrder = await blocksOrderCollection //fetching old block orders
      .where('workoutId', '==', workoutId)
      .where('userId', '==', userId)
      .get();

    let blockOrderObj;
    let blockOrderDocId;
    //getting blockOrder object and blockOrder document id
    blockOrder.forEach((block) => {
      blockOrderObj = block.data()
      blockOrderDocId = block.id;
    })

    //updating blockIds for blockOrder object
    let blockIds = []

    ///exploring blocks   
    blocks.forEach(async (block) => {
      blockIds.push(block.id);

      //getting exerciseOrderObject from firebase
      let exerciseOrder = await exercisesOrderCollection
        .where('blockId', '==', block.id)
        .where('userId', '==', userId)
        .where('status', '==', 1)
        .get();

      let exerciseOrderObj;
      let exerciseOrderDocId;

      //getting exerciseOrderObject from firebase
      exerciseOrder.forEach((item) => {
        exerciseOrderObj = item.data()
        exerciseOrderDocId = item.id;
      })

      let exercises = block.exercises || [];
      let exerciseIds = [];

      //adding exercises ids to exerciseIds array
      exercises.forEach((exercise) => {
        exerciseIds.push(exercise.id);
      })

      exerciseOrderObj.exercisesIds = exerciseIds;

      delete block['exercises']

      //saving updated exerciseOrderCollection
      await exercisesOrderCollection.doc(exerciseOrderDocId).set(exerciseOrderObj)

      //saving updated block in blockCollection
      await blocksCollection.doc(block.id).set(block)
    })

    //saving updated blockOrderObject in blockOrderCollection
    blockOrderObj['blockIds'] = blockIds;
    await blocksOrderCollection.doc(blockOrderDocId).set(blockOrderObj)

    //saving updated workoutObject in workoutObjectCollection
    delete workoutObj['blocks'];
    await workoutsCollection.doc(workoutObj.id).set(workoutObj)

    console.log('*********************')
    console.log(workoutObj)
    console.log('*********************')

    return successResponse('success', workoutObj)
  } catch (error) {
    console.log(error)
    return errorResponse(2)
  }
}

const closeWorkout = async (workoutId: string) => {
  try {
    const userId: any = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    await usersCollection.doc(userId).update({ activeWorkout: null })

    return successResponse('success')
  } catch (error) {
    return errorResponse(2)
  }
}

const fetchWorkoutSettingsData = async (workoutId: string) => {
  try {
    const userId = await isUserAuthenticated();

    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    let colors = await colorsCollection.where('status', '==', 1).get(),
      sounds = await soundsCollection.where('status', '==', 1).get(),
      workout = await workoutsCollection.doc(workoutId).get(),
      colorsArr = [],
      soundsArr = [];

    workout = JSON.parse(JSON.stringify(workout.data()));
    let workoutImage = workout.data().image;

    let document;
    colors.forEach((color) => {
      document = JSON.parse(JSON.stringify(color.data()))
      document['id'] = color.id
      colorsArr.push(document)
    })
    sounds.forEach((sound) => {
      document = JSON.parse(JSON.stringify(sound.data()))
      document['id'] = sound.id
      soundsArr.push(document)
    })

    return successResponse('Format fetched successfully', {
      workoutImage,
      colorsArr,
      soundsArr
    })
  } catch (error) {
    // console.log(error)
    return errorResponse(2)
  }
}

const uploadWorkoutImage = (image: any, workoutId: string) => {

  let workoutImagePath = `workout/${image.name}-${moment().unix()}`,
    imageRef = storageRef.child(workoutImagePath)

  imageRef.put(image).then((snapshot) => {
    snapshot.ref.getDownloadURL().then(async (imageUrl) => {
      await workoutsCollection.doc(workoutId).update({
        image: imageUrl,
        modified: moment().unix(),
      })

      return {
        sucess: 1,
        status: 200,
        message: 'Image uploaded successfully',
        data: {}
      }
    });
  });
}


const workoutChange = (id) => workoutsCollection.doc(id)

export {
  workoutChange,
  fetchWorkouts,
  fetchWorkout,
  deleteWorkout,
  editWorkout,
  newWorkout,
  workoutSettings,
  workoutsSaveIt,
  fetchUsedWorkouts,
  closeWorkout,
  fetchWorkoutSettingsData,
  uploadWorkoutImage,
  saveItWorkoutData
}