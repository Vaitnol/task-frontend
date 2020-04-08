import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import Loader from './loader/loader.component'
import Table from './table/table.component'
import DetailRow from './dataRow/dataRow.component'
import Selector from './links/links.component'
import Search from './search/search.component'
import _ from 'lodash'


class App extends Component {

    state = {
        isSelected: false,
        isLoading: false,
        data: [],
        search: '',
        sortPlace: 'id',
        row: null,
        currentPage: 0
    }

    async getData(url) {
        try {
            const response = await fetch(url)
            const data = await response.json()

            this.setState({
                isLoading: false,
                data: _.orderBy(data, this.state.sortPlace, this.state.sort)
            })
        } catch (error) {
            setTimeout(() => {
                alert('Ошибка в подключении')
            }, 3000)
        }

    }

    onSort = sortPlace => {
        const clone = this.state.data.concat()
        const data = _.orderBy(clone, sortPlace)
        this.setState({data, sortPlace})
    }

    SelectHandler = url => {
        this.setState({
            isSelected: true,
            isLoading: true
        })

        this.getData(url)
    }

    onRowSelect = row => {
        this.setState({row})
    }

    handlePageClick = ({selected}) => {
        this.setState({currentPage: selected})
    }

    searchHandler = search => {
        this.setState({search, currentPage: 0})
    }
    
    getFilteredData() {
        const {data, search} = this.state
        if(!search) {
            return data
        }

        return data.filter(item => {
            return item['firstName'].toLowerCase().includes(search.toLowerCase())
            || item['lastName'].toLowerCase().includes(search.toLowerCase())
        })
    }

    render() {
        const pageSize = 50
        if(!this.state.isSelected) {
            return (
                <div className='container'>
                    <Selector onSelect={this.SelectHandler}/>
                </div>
            )
        }

        const filteredData = this.getFilteredData()

        const pageCount = Math.ceil(filteredData.length / pageSize)

        const displayData = _.chunk(filteredData, pageSize)
        [this.state.currentPage]

        return (
            <div className="container">
                {
                this.state.isLoading
                    ? <Loader />
                    : <React.Fragment>
                        <Search onSearch={this.searchHandler}/>
                        <Table 
                            data={displayData} 
                            onSort={this.onSort}
                            sortPlace={this.state.sortPlace}
                            onRowSelect={this.onRowSelect}
                        />
                    </React.Fragment>
                }

                {
                    this.state.data.length > pageSize
                        ? <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        previousClassName='page-item'
                        nextClassName='page-item'
                        previousLinkClassName='page-link'
                        nextLinkClassName='page-link'
                        forcePage={this.state.currentPage}
                      />
                      : null
                }

                {
                    this.state.row
                        ?<DetailRow person={this.state.row} />
                        : null
                }
            </div>
          );
    }
}

export default App;
