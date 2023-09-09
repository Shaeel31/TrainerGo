import { isUserAuthenticated } from './authServices'
import { errorResponse, successResponse } from './commonServices'


const baseUrl = 'https://tg-session-manager.dividisapp.com'

const createSession = async (workoutId: string, code: number) => {
  try {
    const userId = await isUserAuthenticated()
    if (!userId) {
      return console.log("User is not authenticated")
    }
    const response = await fetch(`${baseUrl}/session/createSession/${workoutId}/${code}`)
    .then( response => response.json())
    .then((response) => {
        if (response) {
          console.log( "Data saved successfully!",response)
          return response
        } else {
          console.log("No data available");
            return false
        }
      })
      return response
  } catch (error) {
    console.log("error", error);
    return false
  }
}



  const playSession = async (code: string) => {
    try {
      fetch(`${baseUrl}/session/play/${code}`)
      .then((response) => response.json())
      .then((response) => {
          if (response) {
            console.log( "Data retrieve successfully!",response)
          } else {
            console.log("No data available");
          }
        })
    } catch (error) {
      return errorResponse(2)
    }
  }

  const pauseSession = async (code: string) => {
    try {
      fetch(`${baseUrl}/session/pause/${code}`)
      .then( response => response.json())
      .then((response) => {
          if (response) {
            console.log( "Data retrieve successfully!",response)
          } else {
            console.log("No data available");
          }
        })
    } catch (error) {
      return errorResponse(2)
    }
  }

  const changeMod = async (code: string, isMod: boolean) => {
    try {
      fetch(`${baseUrl}/session/changeMod/${code}/${isMod}`)
      .then( response => response.json())
      .then((response) => {
          if (response) {
            console.log( "Data retrieve successfully!",response)
          } else {
            console.log("No data available");
          }
        })
    } catch (error) {
      return errorResponse(2)
    }
  }

  const addTime = async (code: string) => {
    try {
      fetch(`${baseUrl}/session/addTime/${code}/15`)
      .then( response => response.json())
      .then((response) => {
          if (response) {
            console.log( "Data retrieve successfully!",response)
          } else {
            console.log("No data available");
          }
        })
    } catch (error) {
      return errorResponse(2)
    }
  }

  const resetTime = async (code: string) => {
    try {
      fetch(`${baseUrl}/session/reset/${code}`)
      .then( response => response.json())
      .then((response) => {
          if (response) {
            console.log( "Data retrieve successfully!",response)
          } else {
            console.log("No data available");
          }
        })
    } catch (error) {
      return errorResponse(2)
    }
  }

  const blockChange = async (code: string, blockId: string) => {
    try {
      fetch(`${baseUrl}/session/blockChange/${code}/${blockId}`)
      .then( response => response.json())
      .then((response) => {
          if (response) {
            console.log( "Data retrieve successfully!",response)
          } else {
            console.log("No data available");
          }
        })
    } catch (error) {
      return errorResponse(2)
    }
  }

  const getSession = async (type: string) => {
    try {
      console.log("type",type)
    } catch (error) {
      return errorResponse(2)
    }
  }


export {
  createSession,
  playSession,
  pauseSession,
  addTime,
  blockChange,
  changeMod,
  resetTime,
  getSession
}