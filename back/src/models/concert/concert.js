const ConcertModel = require('./concert.model');
const DatabaseInterface = require('../../database/database.interface');
const BandModel = require('../band/band')
const ConcertValidate = require('./concert.validator')
const UserClass =  require('../user/user')

const validateCleanReview = async ({image,sound,band }) => {

  let concertIsValid = ConcertValidate.validNewCleanReview({image,sound,band })

  if (!concertIsValid) {

    throw new Error(
      JSON.stringify({
        code: 400,
        msg: 'Dados inválidos ou faltantes'
      })
    );

  }

}

module.exports.validateCleanReview = validateCleanReview

const retrieveConcertById = async id => {
  const concertWithThisId = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    id
  );

  return concertWithThisId;
};
module.exports.retrieveConcertById = retrieveConcertById;

const registerConcert = async ({ 
  bandId,
  ticketPrice,
  title,
  locationName,
  concertPhoto
 }) => {
  if (concertPhoto === undefined) {
    concertPhoto = null;
  }

  const concertModel = await DatabaseInterface.newModelInstance(ConcertModel.modelDatabaseName, {
    bandId, //ID
    streamURL: null,
    ticketPrice,
    bandDetails: {
      bandPhoto: null,
      bandPhaseToday: '',
      album: {
        tourDescription: '',
        tourPhoto: null
      }
    },
    concertDetails: {
      title,
      concertPhoto,
      description: '',
      date: `${+new Date()}`,
      estimatedDuration: '',
      setlist: []
    },
    location: {
      name: locationName,
      address: '',
      geolocation: {
        lat: null,
        lng: null
      },
    },
    ticketsSold: 0,
    concertUnderPreparation: false,
    concertLive: false,
    concertCompleted: false,
    reviews: {
      reviewCount: 0,
      score: 0,
      userReview: [],
      imageReview: {
        score: 0,
        '5': 0,
        '4': 0,
        '3': 0,
        '2': 0,
        '1': 0
      },
      soundReview: {
        score: 0,
        '5': 0,
        '4': 0,
        '3': 0,
        '2': 0,
        '1': 0
      },
      bandReview: {
        score: 0,
        '5': 0,
        '4': 0,
        '3': 0,
        '2': 0,
        '1': 0
      }
    }
    
  });

  const concertCreated = await DatabaseInterface.saveNewModelInstance(concertModel);
  return concertCreated;
};
module.exports.registerConcert = registerConcert;

const updateConcertDetails = async (concertId, bandId, { 
  title,
  concertPhoto,
  description,
  date,
  estimatedDuration,
  setlist
}) => {
  const concertFind = await retrieveConcertById(concertId);

  console.log(concertFind._id, bandId);

  if (concertFind.bandId !== bandId) {
    throw new Error(
      JSON.stringify({
        code: 401,
        msg: 'Você não possui permissão para alterar esse show'
      })
    );
  }

  concertFind.concertDetails = { 
    title: title || concertFind.title,
    concertPhoto: concertPhoto || concertFind.concertPhoto,
    description: description || concertFind.description,
    date: date || concertFind.date,
    estimatedDuration: estimatedDuration || concertFind.estimatedDuration,
    setlist: setlist || concertFind.setlist
  }
  await concertFind.save();

  return concertFind;
};
module.exports.updateConcertDetails = updateConcertDetails;

const getBandByConcertId = async ({concertId}) => {

  const bandWithThisId = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );
 
  let bandId = bandWithThisId.bandId

  return BandModel.getBand({bandId})
}

module.exports.getBandByConcertId = getBandByConcertId;

const getConcertById = async ({concertId}) => {

  const bandWithThisId = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );
 
  return bandWithThisId
}

module.exports.getConcertById = getConcertById;

const getConcerts = async () => {

  const concerts = await DatabaseInterface.findModelInstance(
    ConcertModel.modelDatabaseName,
  );
 
  return concerts

}
module.exports.getConcerts = getConcerts;


const updateConcertDate = async ({concertId,date}) => {

  const bandWithThisId = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );


  console.log(concertId)

  if (bandWithThisId.concertDetails != undefined) {
    bandWithThisId.concertDetails.date = date
  }else{
   throw new Error("concertDetails não existe")
  }

  return bandWithThisId.save()
 

}
module.exports.updateConcertDate = updateConcertDate;


const postReviewById = async ({concertId,image,sound,band,userId}) => {

  const concertByid = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );


  if (concertByid.reviews.userReview.filter((item)=> item.userId === userId).length > 0) {
    return concertByid
  }



  let reviewCount = concertByid.reviews.reviewCount  
  let score =  concertByid.reviews.score

  let imageReview = concertByid.reviews.imageReview 
  let soundReview = concertByid.reviews.soundReview 
  let bandReview = concertByid.reviews.bandReview 


  if (imageReview != undefined ) {
      let score = imageReview.score

      imageReview[image] += 1

      let count = 0

      for (const iterator of Object.keys(imageReview)) {
        if (iterator != "score" && iterator != "$init") {
          count += imageReview[iterator]
        }
        
      }

      score = ( score + image) / count 

      imageReview.score = score
  }

  if (soundReview != undefined) {
    let score = soundReview.score

    soundReview[`${sound}`] += 1

    let count = 0

    for (const iterator of Object.keys(soundReview)) {
      if (iterator != "score" && iterator != "$init") {
        console.log("iterator ",iterator)
        count += soundReview[iterator]
        console.log("count ",count)
      }
      
    }

    score = ( score + sound) / count 

    soundReview.score = score
  }

  if (bandReview != undefined) {

    let score = bandReview.score

    bandReview[`${band}`] += 1

    let count = 0

    for (const iterator of Object.keys(bandReview)) {
      if (iterator != "score" && iterator != "$init") {
        count += bandReview[iterator]
      }
      
    }

    score = ( score + band) / count 

    bandReview.score = score
  }

  reviewCount += 1
  score = ( imageReview.score + soundReview.score + bandReview.score ) / 3 


  concertByid.reviews.userReview.push({
    userId: userId,
    when: new Date(), //TIMESTAMP
    imageScore: image,
    soundScore: sound,
    bandScore: band
  })

  
  concertByid.reviews.reviewCount = reviewCount
  concertByid.reviews.score = score

  return concertByid.save()

}
module.exports.postReviewById = postReviewById;

const getReviewById = async ({concertId }) => {

  const concertByid = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );

  return concertByid.reviews
}
module.exports.getReviewById = getReviewById;

const postSetList = async ({concertId,position,name,start,duration}) => {

  const concertByid = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );

  let setlist = concertByid.concertDetails.setlist 
    
  if (setlist != undefined ) {

    if( setlist.filter((item)=> item.position == position ).length > 0){
      concertByid.concertDetails.setlist.push({
        position: setlist.length + 1,
        name,
        start,
        duration
      })
    }else{
      concertByid.concertDetails.setlist.push({
        position,
        name,
        start,
        duration
      })
    }

  }else{
    concertByid.concertDetails.setlist = [
      position,
      name,
      start,
      duration
    ]
  }

  return concertByid.save()

}

module.exports.postSetList = postSetList;

const deleteMusicSetListByConcertId = async ({concertId,musicId}) => {
 
  const concertByid = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );

  let setlist = concertByid.concertDetails.setlist 
    
  if (setlist != undefined ) {
    let novoArray = setlist.filter((item)=> item._id != musicId )

    concertByid.concertDetails.setlist = novoArray

  }

  return concertByid.save()
}
module.exports.deleteMusicSetListByConcertId = deleteMusicSetListByConcertId;


const startConcertByConcertId = async ({concertId}) => {
  
  const concertByid = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );

  concertByid.concertLive = true

  return concertByid.save()

}

module.exports.startConcertByConcertId = startConcertByConcertId;


const finishConcertByConcertId = async ({concertId}) => {

  const concertByid = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );

  concertByid.concertCompleted = true

  return concertByid.save()

}

module.exports.finishConcertByConcertId = finishConcertByConcertId;


const preparationConcertByConcertId = async ({concertId}) => {

  const concertByid = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );

  concertByid.concertUnderPreparation = true

  return concertByid.save()

}

module.exports.preparationConcertByConcertId = preparationConcertByConcertId;


const putLocalConcertByConcertId = async ({concertId,name,address,geolocation}) => {

  const concertByid = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );

  concertByid.location.name = name
  concertByid.location.address = address
  concertByid.location.geolocation.lat = geolocation.lat
  concertByid.location.geolocation.lng = geolocation.lng
  
  return concertByid.save()

}

module.exports.putLocalConcertByConcertId = putLocalConcertByConcertId;


const updatePhotoBand = async ({concertId,photo}) => {

  const concertByid = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );

  concertByid.concertDetails.concertPhoto = photo

  return concertByid.save()

}

module.exports.updatePhotoBand = updatePhotoBand;


const deletePhotoBand = async ({concertId,photo}) => {

  const concertByid = await DatabaseInterface.findByIdModelInstance(
    ConcertModel.modelDatabaseName,
    concertId
  );

  concertByid.concertDetails.concertPhoto = ""

  return concertByid.save()

}

module.exports.deletePhotoBand = deletePhotoBand;
