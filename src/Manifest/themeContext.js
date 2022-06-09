import React from "react";
const ThemeContext = React.createContext()

class ThemeProvider extends React.Component{
    state = {
        value: ""
    }
    

    setValue = (newValue)=>{
        this.setState(prev => ({value: newValue}))
    }
    
    render(){
        return <ThemeContext.Provider value= {{data: this.state.value, setData: this.setValue}}>
            {this.props.children}
        </ThemeContext.Provider>
    }
}
const ThemeConsumer = ThemeContext.Consumer
console.log(ThemeConsumer)


