import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: props.projects[0].id,
            text: '',
            user: props.users[0].id,
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.create_todo(this.state.project, this.state.text, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form style={{textAlignLast: 'center'}}
                  onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label htmlFor="project">project</label><br></br>
                    <select name="project" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item, index) =>
                            <option
                                key={index}
                                value={item.id}>{item.title}
                            </option>)}
                    </select>
                </div><br></br>

                <div className="form-group">
                    <label htmlFor="text">text</label><br></br>
                    <input type="text" className="form-control" name="text"
                           value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div><br></br>

                <div className="form-group">
                    <label htmlFor="user">author</label><br></br>
                    <select name="user" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item, index) =>
                            <option
                                key={index}
                                value={item.id}>{item.username}
                            </option>)}
                    </select>
                </div><br></br>

                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default TodoForm