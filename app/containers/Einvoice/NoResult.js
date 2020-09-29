import React from 'react'


class NoResult extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
             hasError:false
        }
    }
    

    
    static getDerivedStateFromError(error){
        return{
            hasError:true
        }
    }

    render(){
        const result = {
            fontSize: "25px",
            lineHeight: "2rem",
            fontWeight:"bold",
            color:"#123F74"
        }
    
       
        if(this.state.hasError){
            return (
                <div  style={{ marginTop: "5rem",marginLeft:"29rem" }}>
                <p style={ result }>No Results Found</p>
                 </div>
                 )
            }
                return this.props.children
        
    }
}

export default NoResult;