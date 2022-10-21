import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: '',
            text: '',
            user: '',
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    // handleUsersChange(event) {
    //     if (!event.target.selectedOptions) {
    //         this.setState({
    //             'users': []
    //         })
    //         return;
    //     }
    //     console.log(event.target.selectedOptions)
    //     let users = []
    //     for (let i = 0; i < event.target.selectedOptions.length; i++) {
    //         users.push(event.target.selectedOptions.item(i).value)
    //     }
    //     this.setState({
    //         'users': users
    //     })
    // }


    handleSubmit(event) {
        console.log(this.state.project)
        console.log(this.state.text)
        console.log(this.state.user)
        this.props.create_todo(this.state.project, this.state.text, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <input type="number" className="form-control" name="project"
                           value={this.state.project}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="title">title</label>*/}
                {/*    <input type="text" className="form-control" name="title"*/}
                {/*           value={this.state.title}*/}
                {/*           onChange={(event) => this.handleChange(event)}/>*/}
                {/*</div>*/}
                <div className="form-group">
                    <label htmlFor="text">text</label>
                    <input type="text" className="form-control" name="text"
                           value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="user">author</label>
                    <input type="number" className="form-control" name="user" value={this.state.user}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="users">authors</label>*/}
                {/*    <select name="users" multiple*/}
                {/*            onChange={(event) => this.handleUsersChange(event)}>*/}
                {/*        {this.props.users.map((item, index) =>*/}
                {/*            <option key={index} value={item.id}>{item.username}</option>)}*/}
                {/*    </select>*/}
                {/*</div>*/}


                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
    );
    }
    }

    export default TodoForm