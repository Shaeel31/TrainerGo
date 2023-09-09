import styled from 'styled-components'

export const WorkSpaceContainer = styled.div`
  display: flex;
  height: calc(100vh - 75px);
  width: 100%;
  overflow: hidden;
  flex-direction: column;
`
export const WorkSpaceAddWorkout = styled.div`
  display: flex;
  margin-top: 30%;
  justify-content: center;
  align-items: flex-end;
  height: 100vh;
  width: 100%;
`

export const WorkSpaceSection = styled.div`
  height: auto;
  width: 100%;
  display: grid;
  gap: 12px;
  grid-template-rows: 50px 20px 1fr;
`
export const WorkSpaceMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
`
export const WorkSpaceTitle = styled.div`
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 50px;
  padding: 0 24px;
  height: 45px;
`
export const WorkSpaceActions = styled.div``

export const WorkoutTitle = styled.div`
  .ant-typography {
    margin: 0;
  }
`

export const WorkoutActions = styled.div`
  display: flex;
  justify-content: flex-end;

  div {
    cursor: pointer;
    width: 30px;
    height: 100%;
  }
  button {
    border: none;
  }
`
export const WorkoutDetailsBar = styled.div`
  display: flex;
  align-items: center;
  color: #6d6d6d;
  padding: 0px 24px;
  font-size: 16px;

  span {
    display: flex;
    align-items: center;

    p {
      margin: 0 8px 0 2px;
    }

    &:not(:last-of-type) {
      margin-right: 8px;
    }
  }

  span:last-of-type {
    margin-left: 10%;
  }

  h3 {
    color: #6d6d6d;
  }
`
