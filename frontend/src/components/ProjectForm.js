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
        console.log(event.target.selectedOptions)
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users': users
        })
    }


    handleSubmit(event) {
        console.log(this.state.title)
        console.log(this.state.link)
        console.log(this.state.users)
        this.props.create_project(this.state.title, this.state.link, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="title">title</label>
                    <input type="text" className="form-control" name="title"
                           value={this.state.title}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="link">link</label>
                    <input type="text" className="form-control" name="link"
                           value={this.state.link}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="users">authors</label>
                    <select name="users" multiple
                            onChange={(event) => this.handleUsersChange(event)}>
                        {this.props.users.map((item, index) =>
                            <option key={index} value={item.id}>{item.username}</option>)}
                    </select>
                </div>


                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm