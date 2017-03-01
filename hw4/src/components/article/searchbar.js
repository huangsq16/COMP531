import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { searchKeyword } from './articleActions'
export const SearchBar = ({filter}) => {
	let keyword;
	const _filter = () => {
		filter(keyword? keyword.value: "");
	}	
	//render search bar	
	return (
		<div className="container">
	    	<div className="row">
	    	<div className="status-update">
				<input className="searchbar" ref={(node) => keyword = node}placeholder="Filter" type="text"/>
	            <button onClick={_filter} className="btn btn-default status-update-button" >
				  <span className="glyphicon glyphicon-search"></span>
				</button>
				</div>
			</div>
	    </div>
);
}

SearchBar.propTypes = {
    filter: PropTypes.func.isRequired
}
export default connect(
	(state) => ({}),
	(dispatch) => ({
		filter: (keyword) => dispatch(searchKeyword(keyword))
	})
)(SearchBar)