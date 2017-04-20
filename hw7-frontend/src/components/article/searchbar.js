import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { searchKeyword } from './articleActions'
export const SearchBar = ({filter}) => {
	let keyword;
	const _filter = () => {
		if (keyword != undefined){
			filter(keyword.value);
		}
	}	
	//render search bar	
	return (
    	<div className="status-update">
			<input id='search' className="searchbar" onChange={_filter} ref={(node) => keyword = node} placeholder="Filter" type="text"/>
		</div>
	);
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		filter: (keyword) => dispatch(searchKeyword(keyword))
	})
)(SearchBar)