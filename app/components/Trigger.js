/**
 * Created by shishirarora on 28/12/15.
 */
import React, { PropTypes, Component }  from 'react';
import { Modal, Button, Input, ButtonInput } from 'react-bootstrap';
import getContentInfo from '../utils/data';
import Select from 'react-select'


class Trigger extends Component {
    constructor(props) {
        super(props);
        var teamsObj = getContentInfo();
        this.state = {
            teamsObj: teamsObj,
            show: false,
            style: null,
            selectedTeam: teamsObj[0].team,
            selectedEmployee: teamsObj[0].employees[0],
            employees: teamsObj[0].employees,
            teamIndex:0,
            teams: teamsObj.map((teamObj)=> {
                return teamObj.team;
            })
        };
        this.update = this.update.bind(this);
        this.setChecked = this.setChecked.bind(this);
    }


    update(newTeamIndex) {
        var selectedTeamObj = this.state.teamsObj[parseInt(newTeamIndex)];
        this.setState({
            teamIndex: newTeamIndex,
            selectedTeam: selectedTeamObj.team,
            employees: selectedTeamObj.employees,
            selectedEmployee: selectedTeamObj.employees[0]
        });
    }
    setChecked(e){
        this.setState({
            checked: e.target.checked
        });
    }

    render() {
        let close = () => this.setState({show: false});
        return (
            <div className="modal-container" style={{height: 1000}}>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => this.setState({ show: true})}
                    >
                    Launch Modal
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title className="text-primary" id="contained-modal-title">Select an employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className='clearfix'>
                            <fieldset>
                                <div className="checkbox">
                                    <label>
                                        <Input type="checkbox" label="Send welcome email to employee" onChange={this.setChecked} checked={this.state.checked}/>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Select a team in organization</label>
                                    <Select type="select"
                                        id = 'teams'
                                        name="teams"
                                        value={this.state.teamIndex}
                                            key="teams"
                                        options={this.state.teams.map((team,id) => {return {value:id, label:team, clearableValue: false}})}
                                        onChange={this.update}
                                        placeholder= 'Select team'
                                        matchPos= "start"
                                        matchProp= "label"/>
                                </div>
                                <div className="form-group">
                                    <label>Select an Employee</label>
                                    <Select type="select"
                                        id = 'employees'
                                            key="employees"
                                        value="0"
                                        name="employees"
                                        options={this.state.employees.map((employee,id) => {return {value:id, label:employee, clearableValue: false}})}
                                        placeholder= 'Select Employee'
                                        matchPos= "start"
                                        matchProp= "label"/>

                                </div>
                                <ButtonInput className="pull-left" value="Cancel"/>
                                <ButtonInput bsStyle="primary" className="pull-right" type="submit" value="OK"/>
                            </fieldset>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Trigger
