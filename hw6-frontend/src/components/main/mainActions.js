import { NAV_LANDING, NAV_PROFILE, NAV_MAIN, UPDATE_HEADLINE, resource } from '../../actions'
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
    return (dispatch) => {
        resource('PUT', 'headline', {headline: text}).then(r => {
            dispatch({
                type : UPDATE_HEADLINE,
                text : r.headline
            })
        })
    } 
}





