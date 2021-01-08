const isEmpty = (string) => {
  if(string.trim() === "") return true
  else return false
}

const isEmail = (string) => {
  const regEx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  if(string.match(regEx)) return true;
  else return false;
}

exports.validateSignUpData = (data) => {
  errors = {};
  if(isEmpty(data.email)) {
    errors.email = "Must not be empty";
  }
  else if(!isEmail(data.email)) {
    errors.email = "Must be a valid email";
  }
  if(isEmpty(data.handle)){
    errors.handle = "Must not be empty";
  }
  if(isEmpty(data.password)){
    errors.password = "Must not be empty";
  }
  if(data.password !== data.confirmPassword){
    errors.confirmPassword = "Passwords must match";
  }

  return {
    isValid: Object.keys(errors).length === 0 ? true : false,
    errors
  };
}

exports.validateSignInData = (data) => {
  errors = {};
  if(isEmpty(data.email)) errors.email = "Must not be empty"
  else if(!isEmail(data.email)) errors.email = "Must be a valid email address"
  if(isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    isValid: Object.keys(errors).length === 0 ? true : false,
    errors
  };
}

exports.validateUserDetails = (data) => {
  details = {};
  const {bio, website, location} = data;
  if(!isEmpty(bio)) details.bio = bio;
  if(!isEmpty(website)) {
    if(website.trim().startsWith("http")){
      details.website = website.trim();
    }
    else{
      details.website = `http://${website.trim()}`;
    }
  }
  if(!isEmpty(location)) details.location = location;

  return details;
}