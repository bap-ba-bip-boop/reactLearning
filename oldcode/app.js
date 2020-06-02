class IndecitionApp extends React.Component{
    constructor(props){
        super(props);

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        };
    }

    componentDidMount(){
        //very flawed
        console.log("component mounted")
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState( ()=>({options}) );
            }
        }catch(e){

        }
    }
    componentDidUpdate(prevProps, prevState){
        //bit flawed
        if(prevState.options.length != this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
        console.log("component updated")
    }
    componentWillUnmount(){
        console.log("component unmounted")
    }

    handleDeleteOptions(){
        this.setState( ()=> ({
            options: []
        }) )
    }
    handleDeleteOption(optionToRemove){
        this.setState( (prevState)=>({
            options: prevState.options.filter( 
                (option)=>optionToRemove != option )
        }))
    }
    handlePick(){
        alert(this.state.options[Math.floor(Math.random()*this.state.options.length)]);
    }
    handleAddOption(option){
        if(!option){
            return 'enter valid value';
        }
        else if(this.state.options.indexOf(option) > -1){
            return 'item alredy exists';
        }
        this.setState( (prevState)=>({
            options: prevState.options.concat(option)
        }) )
    }
    render(){
        const subtitle = 'Your choices in the hands of a computer';

        return(
            <div>
                <Header subtitle = {subtitle}/>
                <Action 
                hasOptions = {this.state.options.length > 0}
                handlePick = {this.handlePick}
                />
                <Options 
                options = {this.state.options}
                handleDeleteOptions = {this.handleDeleteOptions}
                handleDeleteOption = {this.handleDeleteOption}
                />
                <AddOption
                handleAddOption = {this.handleAddOption}
                />
            </div>
        );
    }
}

const Header = (props)=>{
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props)=>{
    return (
        <div>
            <button 
            onClick={props.handlePick}
            disabled = {!props.hasOptions}
            >what should I do?</button>
        </div>
    );
}
const Options = (props) =>{
    return(
        <div>
            <button onClick = {props.handleDeleteOptions}>Remove All</button>
            {props.options.length == 0 && <p>Please add an option to get started</p>}
            <p> Amount of options: {props.options.length} </p>
            {
            props.options.map( (item)=> (
            <Option 
                key = {item} 
                optionText = {item}
                handleDeleteOption ={props.handleDeleteOption}/>
            )) 
            }
        </div>
    );
}
const Option = (props) =>{
    return(
        <div>
            {props.optionText}
            <button onClick = {(e)=>{
                props.handleDeleteOption(props.optionText)
            }}
            >
                Remove</button> 
        </div>
    );
}
class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();

        const error = this.props.handleAddOption(option);

        //this.setState( ()=>{
        //    return{ error };
        //} )
        this.setState( ()=>({error}))

        if(!error){
            e.target.elements.option.value = "";
        }
    }
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type = "text" name = "option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

const User = (props)=> {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );
}

//ReactDOM.render(<User name = "Andrew" age = {25}/>, document.getElementById("app"));
ReactDOM.render(<IndecitionApp/>, document.getElementById("app"));