import React, {Component} from 'react';
import classes from './GoalsList.module.css';
import Aux from '../../../hoc/Aux';
import Goal from './Goal';

class GoalsList extends Component {
  state = {
    goalsArray: ['Bodybuilding', 'Powerlifting', 'Crossfit ',
                 'Calisthenics', 'Outdoors', 'Endurance',
                 'Running', 'High Intensity', 'Flexibility', 
                 'Agility', 'HITT', 'Gymnastics']
  }

  
  render () {
    const goalsList = (
      <Aux>
        {this.state.goalsArray.map((goal, index) => {
          return (
            <Goal 
              selectedGoals={this.props.selectedGoals}
              key={index} 
              goal={goal} 
              click={this.props.click}/>
          )
        })}
      </Aux>
    )
    return (
      <div>
        <div className={classes.Row}>
          {goalsList}
        </div>
    </div>
    )
  }
}
  
export default GoalsList;