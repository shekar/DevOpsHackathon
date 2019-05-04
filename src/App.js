import React from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

class App extends React.Component{
    state = {
        Response: {
            Items: [{
                name: '',
                biography: '',
                id: '',
                powers: []
            }],
            Count: '',
            ScannedCount: ''
        }
    };
    contructor() {
        
    }
   
    componentDidMount() {
        axios.get('/Heroes', { responseType: 'json' }).then(response => { this.setState({ Response: response.data }); });
    
    }
    
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
            
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };
    render() {
        return (
            <div>
                <Table responsive striped bordered >
                    <thead>
                        
                     </thead>
                    <tbody>
                        {
                            Object.keys(this.state.Response.Items).map((k, i) => {
                            let data = this.state.Response.Items[k];
                                return (
                                    <tr key={k.id}>
                                    <td>{k.id}</td>
                                    <td>{data.name}</td>
                                        <td>{data.biography}</td>
                                        <td>
                                            <ul>
                                            {data.powers.map(i => {
                                                return <li>{i}</li>})}
                                            </ul>
                                    </td>



                                </tr>
                                );
                        })}
                    </tbody>
                </Table>
                
                
            </div>
        );
    }
}
export default App;
