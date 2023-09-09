import { storage } from '../firebase/index'
import moment from 'moment'
let storageRef = storage.ref();

const errorResponse = (error: any, status = 400) => {
  if (typeof error == 'number') {
    switch (error) {
      case 1:
        error = 'Provide valid data'
        break
      case 2:
        error = 'Error occured try again'
        break
      case 3:
        error = 'Provide exercises array to create combo'
        break
    }
  }
  return {
    sucess: 0,
    status,
    message: error,
  }
}

const successResponse = (
  message = 'Service executed sucessfully',
  data = null
) => {
  return {
    sucess: 1,
    status: 200,
    message,
    data,
  }
}

const uploadImage = ( image: any ) => {

  let workoutImagePath = `${image.name}-${moment().unix()}`,
      imageRef = storageRef.child(workoutImagePath)

  imageRef.put(image).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    snapshot.ref.getDownloadURL().then(imageUrl => { 
      return {
        sucess: 1,
        status: 200,
        message: '',
        data: imageUrl
      }
    }); 
  });
}

export { errorResponse, successResponse, uploadImage }
