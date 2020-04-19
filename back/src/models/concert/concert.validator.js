


const helper = (data) => {

    if (Number.isInteger(data)) {
        if (data >= 0 && data <= 5  ) {
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

const validNewCleanReview = ({image,sound,band }) => {

    if (  helper(image) &&  helper(sound) && helper(band)) {
        return true
    }else
        return false
  
}

module.exports.helper = helper
module.exports.validNewCleanReview = validNewCleanReview;
  