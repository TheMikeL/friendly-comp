import React from 'react'

const SelectedCompetition = (props: any) => {
  console.log(props);
  return (
    <div>
      {props.location.state.detail.title}
    </div>
  )
}

export default SelectedCompetition;
