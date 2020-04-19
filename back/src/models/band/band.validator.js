


const helper = (data) => {

    if (data != null && data != "" && data != undefined) {
        return true
    }else{
        return false
    }
}

const validateDetails = (details)=> {

    try {
        let {biography,photo,logo,name,foundationDate} = details

        if(helper(biography) && helper(photo) && helper(logo) && helper(name) && helper(foundationDate))
            return true
        else
            return false

    } catch (error) {
        return false
    }

} 

const validateLocation = (location) => {

    try {
        let {city,state,country} = location

        if(helper(city) && helper(state) && helper(country))
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

const validateMember = (location) => {

    try {
        let {name} = location
        //let {name,instrument} = location
        //&& helper(instrument)
        if(helper(name) )
            return true
        else
            return false

    } catch (error) {
        return false
    }

}


const validateMembers = (members) => {

    if (Array.isArray(members)) {
        if (members.length > 0) {
            let response = false
            for (const iterator of members) {
                if (validateMember(iterator) === false){
                    response = false
                    break
                }else{
                    response = true
                }
            }
            return response
        }else{
            return false
        }
       

    }else{
        return false
    }

 
};

const validEmailString = email => {
return (
    typeof email === 'string' && new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/).test(email)
);
};

const validPasswordString = password => {
return typeof password === 'string' && password.trim().length >= 6;
};

  
const validNewBandBeforeRegister = ({
    email,
    password, 
    foundationDate,
    name,
    segment
}) => {

    const validator =
        validEmailString(email) &&
        validPasswordString(password) &&
        typeof +new Date(foundationDate) === 'number' &&
        typeof name === 'string' &&
        typeof segment === 'string'
    return validator;

};

const validNewBandAfterRegister = ({
    email,
    password, 
    foundationDate,
    name,
    segment
}) => {

    const validator =
        validEmailString(email) &&
        validPasswordString(password) &&
        typeof +new Date(foundationDate) === 'number' &&
        typeof name === 'string' &&
        typeof segment === 'string'
    return validator;

};
  
module.exports.validateLocation = validateLocation;
module.exports.validateMembers = validateMembers; 
module.exports.validateMember = validateMember; 
module.exports.helper = helper; 
module.exports.validateDetails = validateDetails; 
module.exports.validNewBandAfterRegister = 
module.exports.validNewBandBeforeRegister = validNewBandBeforeRegister;
  