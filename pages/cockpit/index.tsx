// @flow
import * as React from 'react'
import { memo, useEffect, useState } from 'react'
import CockpitScreen from '../../screens/cockpit'
import { useRouter } from 'next/router'
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
        if (snapshot.exists()) {
            const data = snapshot.val();
            setUserExercise(data)
            // console.log("data available",data);
          } else {
            // console.log("No data available");
            checkMessage( 400, "Invalid Code")
            router.push('/builder')
          }
      })
    return () => {
      reference.off('value');   
    }  
  }, [id])

  if (!userExercise) return <Loading />
  return (
    <CockpitScreen
      // code={id}
      exercise={userExercise}
    />
  )
  
}
export default memo(Index)
