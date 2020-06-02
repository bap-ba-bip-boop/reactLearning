import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal'

export default class IndecitionApp extends React.Component{
    state = {
        options:[],
        selectedOption: undefined
    }
    handleDeleteOptions = ()=>{
        this.setState( ()=> ({
            options: []
        }) )
    };
    handleDeleteOption = (optionToRemove)=>{
        this.setState( (prevState)=>({
            options: prevState.options.filter( 
                (option)=>optionToRemove != option )
        }))
    };
    handlePick = ()=>{
        //alert(this.state.options[Math.floor(Math.random()*this.state.options.length)]);
        this.setState(
            ()=>({
                selectedOption: this.state.options[Math.floor(Math.random()*this.state.options.length)]
            })
        )
    };
    handleAddOption = (option)=>{
        if(!option){
            return 'enter valid value';
        }
        else if(this.state.options.indexOf(option) > -1){
            return 'item alredy exists';
        }
        this.setState( (prevState)=>({
            options: prevState.options.concat(option)
        }) )
    };
    handleCloseModal = ()=>{
        this.setState(
            ()=>({selectedOption: undefined})
        )
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
                <OptionModal
                selectedOption={this.state.selectedOption}
                handleCloseModal={this.handleCloseModal}
                />
            </div>
        );
    }
}