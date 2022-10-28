import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            link: '',
            users: [],
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users': users
        })
    }


    handleSubmit(event) {
        this.props.create_project(this.state.title, this.state.link, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form style={{textAlignLast: 'center'}}
                  onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label htmlFor="title">title</label><br></br>
                    <input type="text" className="form-control" name="title"
                           value={this.state.title}
                           onChange={(event) => this.handleChange(event)}/>
                </div><br></br>

                <div className="form-group">
                    <label htmlFor="link">link</label><br></br>
                    <input type="text" className="form-control" name="link"
                           value={this.state.link}
                           onChange={(event) => this.handleChange(event)}/>
                </div><br></br>

                <div className="form-group">
                    <label htmlFor="users">authors</label><br></br>
                    <select name="users" multiple
                            onChange={(event) => this.handleUsersChange(event)}>
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

export default ProjectForm