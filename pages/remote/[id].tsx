// @flow
import * as React from 'react'
import { useEffect, useState } from 'react'
import RemoteScreen from './../../screens/RemoteScreen'
import { useRouter } from 'next/router'
// import { updateSessionListener, getSession } from './../../reduxServices/remoteServices'
import Loading from './../../blocks/loading'
import firebase from 'firebase/app'
import { checkMessage } from './../../store/lib/message'

const Index = () => {
  const router = useRouter()
  const {
    query: { id },
  } = router

  const [userExercise, setUserExercise] = useState({})
  
  useEffect(() => {
    const reference = firebase.database().ref(`sessions/${id}`)
    reference.on('value', (snapshot) => {
      console.log("snapshot", snapshot);
        if (snapshot.exists()) {
            const data = snapshot.val();
            setUserExercise(data)
            // console.log("data available",data);
          } else {
            // console.log("No data available");
            checkMessage( 400, "Invalid Code")
            router.push('/remote')
          }
      })
    return () => {
      reference.off('value');   
    }  
  }, [id])

  if (!userExercise) return <Loading />
  return (
    <RemoteScreen
      code={id}
      exercise={userExercise}
    />
  )
}
export default Index
