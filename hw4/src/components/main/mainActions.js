import { NAV_LANDING, NAV_PROFILE, NAV_MAIN, UPDATE_HEADLINE } from '../../actions'
export const navLanding = () => {
    return {
        type : NAV_LANDING
    }
}

export const navProfile = () => {
    return {
        type : NAV_PROFILE
    }
}

export const navMain = () => {
    return {
        type : NAV_MAIN
    }
}


export const updateHeadline = (text) => {
	
	return {
		type : UPDATE_HEADLINE,
		text
	}
}

