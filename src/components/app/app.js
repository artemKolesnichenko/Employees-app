import React from 'react';

import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel'
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list'
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Евген Коваленко', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Миколай Криниця', salary: 2000, increase: true, rise: false, id: 2},
                {name: 'Павло Тетеря', salary: 15000, increase: false, rise: false, id: 3},
            ]
        }
        this.maxId = 4
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase:false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return{
                data: data.filter(item => item.id !== id)
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }

    render() {
        const {data} = this.state

        const employees = this.state.data.length
        const increased = this.state.data.filter(item => item.increase).length

        return (
            <div className="app">
                <AppInfo
                employees={employees}
                increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployeesList 
                data={data}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;