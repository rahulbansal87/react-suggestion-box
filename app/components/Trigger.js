/**
 * Created by shishirarora on 28/12/15.
 */
import React, { PropTypes, Component }  from 'react';
import ReactDOM from 'react-dom'
import { Modal, Button, Input, ButtonInput } from 'react-bootstrap';
import getContentInfo from '../utils/data';
import Select2 from './Select2'


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
            teams: teamsObj.map((teamObj)=> {
                return teamObj.team;
            })
        };
        this.update = this.update.bind(this)
        this.setChecked = this.setChecked.bind(this)
    }


    update(e) {
        var newTeam = e.target.value;
        var newEmployees = this.state.teamsObj.filter(teamObj => teamObj.team === newTeam)[0].employees;
        this.setState({
            selectedTeam: newTeam,
            employees: newEmployees,
            selectedEmployee: newEmployees[0]
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
                                <div class="checkbox">
                                    <label>
                                        <Input type="checkbox" label="Send welcome email to employee" onChange={this.setChecked} checked={this.state.checked}/>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label for='teams'>Select a team in organization</label>
                                    <Select2
                                        id = 'teams'
                                        multiple='multiple'
                                        data={this.state.teams.map((team,id) => {return {id:id, text:team}})}
                                        onChange={() => { this.update } }
                                        placeholder= 'Select team'
                                        options={{
                                        placeholder: 'Select team'
                                      }} />
                                </div>
                                <div className="form-group">
                                    <label for='employees'>Select an Employee</label>
                                    <Select2
                                        id = 'employees'
                                        multiple='multiple'
                                        data={this.state.employees.map((employee,id) => {return {id:id, text:employee}})}
                                        placeholder= "Select Employee"
                                        options={{
                                        placeholder: "Select Employee"
                                      }} />
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