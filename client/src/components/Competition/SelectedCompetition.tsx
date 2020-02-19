import React from 'react'

interface ICompetitionProps{
  location:{
    state:{
      detail:{
        _id: string,
        title: string,
        description: string,
      }
    }
  }
}
const SelectedCompetition: React.FC<ICompetitionProps> = (props: ICompetitionProps) => {
  console.log(props);
  return (
    <div>
      {props.location.state.detail.title}
    </div>
  )
}

export default SelectedCompetition;
