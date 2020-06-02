console.log("helloWorld")

class VisibilityToggle extends React.Component{
    constructor(props){
        super(props);

        this.handleToggle = this.handleToggle.bind(this);

        this.state = {
            visibility :false
        };
    }
    handleToggle(){
        this.setState( (prevState)=>{
            return{
                visibility: !prevState.visibility
            };
        });
    }
    render(){
        return (
            <div>
                <h1>VisibilityToggle</h1>
                <button onClick = {this.handleToggle}>
                    {this.state.visibility ? "Show content" : "Hide content"}
                </button>
                { this.state.visibility && (
                    <div>
                        <p>Here is the hidden Content!</p>
                    </div>
                )}
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle/>, document.getElementById("app"));