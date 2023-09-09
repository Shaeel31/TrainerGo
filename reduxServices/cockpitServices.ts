import { db, auth, googleProvider } from '../firebase/index'
import moment from 'moment'
import { isUserAuthenticated } from './authServices'
import firebase from 'firebase/app'
import { errorResponse, successResponse } from './commonServices'
import { ActionsSection } from '../blocks/exercise-block/styled';
import { KEY_PREFIX } from 'redux-persist/lib/constants'

const usersCollection = db.collection('users'),
  blocksOrderCollection = db.collection('blocksOrder'),
  exercisesCollection = db.collection('exercises'),
  workoutsCollection = db.collection('workouts'),
  exercisesOrderCollection = db.collection('exercisesOrder'),
  blocksCollection = db.collection('blocks'),
  sessionCollection = db.collection('session');

  const fetchWorkout = async (workoutId: string) => {
    try {  
      console.log("+++++++++++++++++++++++++++function called ++++++++++++++++++++++++++++++++++++++")  
      
      console.log(workoutId)  

        const userId: any = await isUserAuthenticated();
        if (!userId) {
          return errorResponse('User is not authenticated')
        }
        if(!workoutId){
          return successResponse('Workout id is undefined', null)
        }
    
        let workout = await workoutsCollection.doc(workoutId).get(),
            blockIdsArr = [],
            blockIndex,
            blockObj = {},
            blocksArr = [],
            newBlocksArr,
            newFetchedExercisesArr,
            blockIdsSortDict = {},
            exerciseIdsArr = [],
            exerciseIndex,
            exerciseObj: any = {},
            cockpitFetchedExercisesArr = [],
            exercisesArr = [],
            exerciseIdsSortDict = {},
            totalTime = 0,
            totalWorkoutTimeWithRounds = 0,
            totalWorkoutTimeWithRoundsInSeconds = 0,
            totalBlocks = 0,
            totalExercises = 0,
            exerciseTotalTime = 0,
            workoutData = JSON.parse(JSON.stringify(workout.data() || {}));
            workoutData.id = workout.id;
    
        if(workoutData.userId != userId){
          return successResponse('Wrong workout id sent', null)
        }
        if(workoutData.status == 0){
          workoutData = {};
          return successResponse('Workout fetched successfully', workoutData)
        }

        const workoutBlocks = await blocksOrderCollection
                .where('workoutId', '==', workoutId)
                .where('userId', '==', userId)
                .where('status', '==', 1)
                .get();
    
        workoutBlocks.forEach((workoutBlock) => {
          blockIdsArr = workoutBlock.data().blockIds;
          blockIndex = 0;
          blockIdsArr.forEach(blockId => {
            blockIdsSortDict[blockId] = blockIndex; 
            blockIndex++;
          })
        })
        // blockIdsArr = blockIdsArr.reverse();
        for(let i = 0; i < blockIdsArr.length; i = i + 10){
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
              blockObj['id'] = block.id;
              blocksArr.push(blockObj)
            })
        }

        newBlocksArr = new Array( blocksArr.length ).fill(0);
        blocksArr.forEach(( block ) => {
          newBlocksArr[blockIdsSortDict[block.id]] = block
        })

        newBlocksArr = newBlocksArr.filter(x => x !== 0)

        blocksArr = newBlocksArr;
        workoutData.blocks = blocksArr;
    
        for (const block of blocksArr) {
          exerciseTotalTime = 0;
          const blockExercises = await exercisesOrderCollection
          .where('blockId', '==', block.id)
          .where('userId', '==', userId)
          .where('status', '==', 1)
          .get();
        
    
          blockExercises.forEach((blockExercise) => {
              exerciseIdsArr = [];
              exerciseIdsArr = blockExercise.data().exerciseIds;
              exerciseIndex = 0;
              exerciseIdsArr.forEach(exerciseId => {
              exerciseIdsSortDict[exerciseId] = exerciseIndex; 
              exerciseIndex++;
            })
          })
          exercisesArr = [];
          let exercises,
          fetchedExercisesObj = [],
          fetchedExercisesArr = [];
          exerciseTotalTime = 0;
    
          for(let i = 0; i < exerciseIdsArr.length; i = i + 10){
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
                cockpitFetchedExercisesArr.push(fetchedExercisesObj)
                fetchedExercisesArr.push(fetchedExercisesObj)
              })
          }
    
          if(fetchedExercisesArr && fetchedExercisesArr.length){

            newFetchedExercisesArr = new Array( fetchedExercisesArr.length ).fill(0);
            fetchedExercisesArr.forEach((exercise) => {
              newFetchedExercisesArr[exerciseIdsSortDict[exercise.id]]  = exercise
            })

            newFetchedExercisesArr = newFetchedExercisesArr.filter(x => x !== 0);


            fetchedExercisesArr = newFetchedExercisesArr;


            fetchedExercisesArr.forEach((exercise) => {
              exerciseObj = {};
              totalExercises = totalExercises + 1;
              totalTime = totalTime + exercise.duration;
              exerciseObj = exercise;
              exerciseObj['id'] = exercise.id;
              exerciseTotalTime = exerciseTotalTime + exerciseObj.duration;
    
              if ( exerciseObj.comboType == 3  ){
                if( exerciseObj.comboType == 3 ){
                  exerciseObj.comboExercises = [];
                  exerciseObj.duration = moment.utc(exerciseObj.duration * 1000).format('mm:ss')
                  exercisesArr.push(exerciseObj);
                }
                let comboExerciseTime = 0;
    
                fetchedExercisesArr.forEach((exerciseData) => {
                  if(exerciseData.comboType == 4 && exerciseData.comboParentId == exerciseObj.id){
    
                    let comboExerciseObj = exerciseData
                        comboExerciseObj['id'] = exerciseData.id;
                        
                        comboExerciseTime = comboExerciseTime + comboExerciseObj.duration
                        exerciseObj['duration']  = moment.utc(comboExerciseTime * 1000).format('mm:ss')
                        comboExerciseObj.duration = moment.utc(comboExerciseObj.duration * 1000).format('mm:ss')

                    exerciseObj.comboExercises.push(comboExerciseObj)                
                  }
                })
                
              }
            if(exerciseObj.comboType == 0){
                exerciseObj.duration = moment.utc(exerciseObj.duration * 1000).format('mm:ss')
                exercisesArr.push(exerciseObj)
            }
            })
          }
          block.exerciseTotalTime =  moment.utc(exerciseTotalTime * 1000).format('mm:ss');
      
          let timeWithRoundsInSeconds = exerciseTotalTime * (block.rounds || 1);
          block.blockTimeWithRoundsInSeconds = timeWithRoundsInSeconds
          totalWorkoutTimeWithRoundsInSeconds = totalWorkoutTimeWithRoundsInSeconds + timeWithRoundsInSeconds
          block.blockTimeWithRounds =  moment.utc( timeWithRoundsInSeconds * 1000).format('mm:ss');
          block.exercises = exercisesArr;
        }

        workoutData.totalTime =  moment.utc(totalTime * 1000).format('HH:mm:ss');
        workoutData.totalTimeInSeconds = totalTime;
        workoutData.totalBlocks = totalBlocks;
        workoutData.totalExercises = totalExercises;
        workoutData.totalWorkoutTimeWithRoundsInSeconds = totalWorkoutTimeWithRoundsInSeconds;
        workoutData.totalWorkoutTimeWithRounds =  moment.utc(totalWorkoutTimeWithRoundsInSeconds * 1000).format('HH:mm:ss');

        let index = 0;
        workoutData.blocks.forEach( block => {
          if(!block.exercises.length){
            workoutData.blocks.splice(index, 1);
          }
          index ++;
        })
    
        console.log("***********************Fetched Workspace Data***********************")    
        console.log(workoutData)    
        console.log("********************************************************************")    
        return successResponse('Workout fetched successfully', workoutData)   

    } catch (error) {
      console.log(error)
      return errorResponse(error.message)
    }
  }

  ///Actions////
  //Pause Timer
  const pauseTimer = async ( sessionId: string, currentTimerTime: number, exerciseCurrentTime: number ) => {
    try {
          const userId = await isUserAuthenticated()
          if (!userId) {
            return errorResponse('User is not authenticated')
          }
          await sessionCollection.doc(sessionId).update({
            currentTimerStatus: 0,
            currentTimerTime,
            modified: moment().unix()
          })  

        return successResponse('Success', {})
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  const startTimer = async ( sessionId: string, currentTimerTime: number, exerciseCurrentTime: number ) => {
    try {
          const userId = await isUserAuthenticated()
          if (!userId) {
            return errorResponse('User is not authenticated')
          }
          await sessionCollection.doc(sessionId).update({
            currentTimerStatus: 1,
            currentTimerTime,
            modified: moment().unix()
          })  

        return successResponse('Success', {})
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  const addTimeInTimer = async ( sessionId: string, currentTimerTime: number ) => { // for reset timer & add 15 sec
    try {
          const userId = await isUserAuthenticated()
          if (!userId) {
            return errorResponse('User is not authenticated')
          }

          await sessionCollection.doc(sessionId).update({
            currentTimerTime,
            modified: moment().unix()
          });

          return successResponse('Success', {})
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  const startWorkout = async ( sessionData: any ) => { // for reset timer & add 15 sec
    try {
          const userId: any = await isUserAuthenticated()
          if (!userId) {
            return errorResponse('User is not authenticated')
          }

          let user: any = await usersCollection.doc(userId).get();

          user = JSON.parse(JSON.stringify(user.data()))

          if(!user.activeSession){

            let sessionId = sessionCollection.doc().id;

            await  sessionCollection.doc(sessionId).set({
              currentExercise: sessionData.currentExercise || '',
              currentExerciseDuration: sessionData.currentExerciseDuration || '',
              currentExerciseId: sessionData.currentExerciseId || '',
              currentExerciseName: sessionData.currentExerciseName || '',
              nextExerciseALT: sessionData.nextExerciseALT || '', 
              nextExerciseId: sessionData.nextExerciseId || '', 
              nextExerciseName: sessionData.nextExerciseName || '',    
              currentTimerStatus: 0,
              currentTimerTime: sessionData.currentTimerTime || ''
            })
  
            await usersCollection.doc(userId).update({ activeSession:  sessionId  })

          }        

          return successResponse('Success', {})
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  const exerciseStatus = async ( currentExercise, nextExercise, sessionId: string ) => {
    try {
          const userId = await isUserAuthenticated()
          if (!userId) {
            return errorResponse('User is not authenticated')
          }

          await sessionCollection.doc(sessionId).update({
            currentExercise: currentExercise.currentExercise,
            currentExerciseDuration: currentExercise.currentExerciseDuration,
            currentExerciseId: currentExercise.currentExerciseId,
            currentExerciseName: currentExercise.currentExerciseName,
            nextExerciseALT: nextExercise.nextExerciseALT, 
            nextExerciseId: nextExercise.nextExerciseId, 
            nextExerciseName: nextExercise.nextExerciseName,
            modified: moment().unix()
          })
        
        return successResponse('Success', {})
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  const fetchSession = async ( sessionId: string ) => {
    try {
          const userId = await isUserAuthenticated()
          if (!userId) {
            return errorResponse('User is not authenticated')
          }

          let session = await sessionCollection.doc(sessionId).get(),
              sessionData = JSON.parse(JSON.stringify(session.data() || {}));

          sessionData.id = session.id;
        
        return successResponse('Session fetched successfully', sessionData)
    } catch (error) {
      console.log(error)
      return errorResponse(error.message)
    }
  }

  //Next Exercise
  //Previous Exercise
  //reset timer
  //Add time in exercise
  //next exercise chan
  /////////////
  //fetch session ( on everytime when session is updated ) 
  //
  ////////////
  //ActionKeys//
  //timer status  0 => stoped  1=> working
  //////////
  //fields//
  //currentTimerStatus 0 => stop 1 => start

  const session = async () => {
    try {
      const userId = await isUserAuthenticated()
      if (!userId) {
        return errorResponse('User is not authenticated')
      }
      sessionCollection.doc('LF5zCbvqwvZWSkfTVMxY').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: ${docSnapshot}`);
        console.log(docSnapshot.data())
      }, err => {
        console.log(`Encountered error: ${err}`);
      });

      return successResponse('User logged out successfully', {})
    } catch (error) {
      return errorResponse(error.message)
    }
  }

export { 
  fetchWorkout,
  session,
  pauseTimer,
  startTimer,
  addTimeInTimer,
  exerciseStatus,
  startWorkout,
  fetchSession
}


