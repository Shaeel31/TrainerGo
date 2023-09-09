import { db, auth, googleProvider } from '../firebase/index'
import moment from 'moment'
import { errorResponse, successResponse } from './commonServices'

const usersCollection = db.collection('users'),
  blocksOrderCollection = db.collection('blocksOrder'),
  sessionCollection = db.collection('session');

const register = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    if (!name || !email || !password || !confirmPassword) {
      return errorResponse(1)
    }

    if (password !== confirmPassword) {
      return errorResponse('Those passwords didn’t match. Try again.')
    }

    const userInfo = await auth.createUserWithEmailAndPassword(email, password)

    await usersCollection.doc(userInfo.user.uid).set({
      name,
      email,
      profileImage: '',
      logo: '',
      linkedin: '',
      youtube: '',
      facebook: '', 
      tiktok: '',
      twitter: '',
      instagram: '', 
      other: '',
      type: 1,
      provider: '',
      activeWorkout: null,
      activeSession: null,
      status: 1,
      created: moment().unix(),
      modified: moment().unix(),
    })

    await blocksOrderCollection.doc(blocksOrderCollection.doc().id).set({
      userId: userInfo.user.uid,
      workoutId: '',
      blockIds: [],
      status: 1,
      created: moment().unix(),
      modified: moment().unix(),
    })

    return successResponse('User created successfully', {
      _id: userInfo.user.uid,
      name,
      email,
      activeWorkout: userInfo.user['activeWorkout'],
      activeSession: userInfo.user['activeSession'],
      type: 1,
      status: 1,
    })
  } catch (error) {
    return errorResponse(error.message)
  }
}

const loginService = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      return errorResponse(1)
    }
    const userInfo = await auth.signInWithEmailAndPassword(email, password),
      user = await usersCollection.doc(userInfo.user.uid).get()

      return successResponse('User signed in successfully', {uid:userInfo.user.uid, ...user.data()})
  } catch (error) {
    return errorResponse(error.message)
  }
}

const isUserAuthenticated = async () => {
  try {
    return new Promise(function (resolve) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          resolve(user.uid)
        } else {
          resolve('')
        }
      })
    })
  } catch (error) {
    return errorResponse(error.message)
  }
}



const getUser = async () => {

  const userId: any = await isUserAuthenticated();

    usersCollection.doc(userId).onSnapshot(userSnapshot => {
      console.log(userSnapshot.data())
    }, err => {
      return errorResponse(err.message)    
    });

}

const logout = async () => {
  try {
    await auth.signOut();
    return successResponse('User logged out successfully', {})
  } catch (error) {
    return errorResponse(error.message)
  }
}

const googleSignIn = async () => {
  try {
    const userInfo = await auth.signInWithPopup(googleProvider),
      userAdditionalInfo = userInfo.additionalUserInfo

    if (userAdditionalInfo.isNewUser) {
      await usersCollection.doc(userInfo.user.uid).set({
        name: userInfo.user.displayName,
        email: userInfo.user.email,
        activeWorkout: null,
        activeSession: null,
        type: 1,
        provider: userAdditionalInfo.providerId,
        status: 1,
        created: moment().unix(),
        modified: moment().unix(),
      })
    }

    return successResponse('User created successfully', {
      _id: userInfo.user.uid,
      name: userInfo.user.displayName,
      email: userInfo.user.email,
      activeWorkout: userInfo.user['activeWorkout'],
      activeSession: userInfo.user['activeSession'],
      type: 1,
      provider: userAdditionalInfo.providerId,
      status: 1,
    })
  } catch (error) {
    return errorResponse(error.message)
  }
}

const updateUser = async (updateObj: any) => {
  try {

    const userId: any = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }

    const userObj = JSON.parse(JSON.stringify(updateObj));

    if(userObj.newPassword){
      const user = await usersCollection.doc(userId).get();
      const userInfo = await auth.signInWithEmailAndPassword( user.data().email, userObj.password );
      if (userInfo){
        if (userObj.newPassword == userObj.confirmNewPassword){
          await auth.currentUser.updatePassword(userObj.newPassword);
        }
      }
      else {
        return errorResponse("Password does not match")
      }
    }

    userObj.password = '';
    userObj.newPassword = '';
    userObj.confirmNewPassword = '';

    await usersCollection.doc(userId).update(userObj)
    return successResponse('Profile updated successfully',userObj)

  } catch (error) {
    return errorResponse(2)
  }
}

const deleteUser = async (password) => {
  try {
    const userId: any = await isUserAuthenticated()
    if (!userId) {
      return errorResponse('User is not authenticated')
    }
    const user = await usersCollection.doc(userId).get();

    const userInfo = await auth.signInWithEmailAndPassword( user.data().email, password );
    if (userInfo){
      
      await usersCollection.doc(userId).delete();
      await auth.currentUser.delete();
      return successResponse('User deleted successfully')

    } else {
      return errorResponse("Password Incorrect")
    }
  } catch (error) {
    return errorResponse(2)
  }
}

export { 
  register, 
  loginService, 
  isUserAuthenticated, 
  googleSignIn, 
  logout, 
  getUser,
  updateUser,
  deleteUser 
}

// updateUser({
//   name: '',
//   email: '',
//   profileImage: '',
//   logo: '',
//   linkedin: '',
//   youtube: '',
//   facebook: '', 
//   tiktok: '',
//   twitter: '',
//   instagram: '', 
//   other: '',
//   password: '',
//   newPassword: '',
//   confirmNewPassword: ''
// })

//deleteUser(password)
