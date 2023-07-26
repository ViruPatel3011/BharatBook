export enum REQUIRED_ERROR {
  EMAIL = "Email is Required Field",
  CODE = "Code is Required Field",
  FIRST_NAME = "FirstName is Required Field",
  LAST_NAME = "LastName is Required Field",
  PHONE_NUMBER = "PhoneNumber is Required Field",
  PASSWORD = "Password is Required Field",
  CONFIRM_PASSWORD = "ConfirmPassword is Required Field",
  BIRTHDATE = "BirthDate is Required Field",
  GENDER = "Gender is Required Field",
  POST_DESCRIPTION = "Post Description is a required field",
  COMMENT_TEXT = "Comment is Required",
  IMAGE = "Image is a required field",
  STORY_TEXT = "Story Text is a required field",
  PROFILE_TEXT = "Profile Text is a required field",
  ADDRESS = "Address is a required field",
}

export enum VALIDATION_MESSAGE {
  PASS_VALIDATE = "Password must contain at least eight characters, at least one number, both lower and uppercase letters, and special characters",
  PHONE_NUMBER_VALIDATE = "That doesn't look like a phone number",
  PHNUM_MINUS_VALIDATE = "A phone number can't start with a minus",
  PHNUM_DECIMAL = "A phone number can't include a decimal point",
  PHNUM_TEN_DIGIT = "Mobile Number must be a 10-digit number",
  IMAGE_SIZE = "Image size should not exceed 2MB",
}

export enum TOASTER_SUCCESS_MSG {
  IS_LOGIN = "LogedIn Successfuly",
  TOKEN_VERIFIED = "Token Verified !!",
  IS_REGISTER = "Registered Successfuly",
  PASSWORD_CHANGED = "Password Changed Successfuly",
  CODE_SENT = "Verification Code sent Successfuly",
  PROFILE_UPDATED = "Profile Updated Successfully",
  STORY_UPLOADED = "Story Uploaded  Successfully",
  POST_UPLOADED = "Post Uploaded  Successfully",
}

export enum TOASTER_ERROR_MSG {
  INVALID_CRED = "Invalid Credentials",
  USER_NOT_EXIST = "User does not exist !!",
}

export enum NETWORK_ERROR {
  BAD_REQUEST = "ERR_BAD_REQUEST",
}

export enum LOCAL_STORAGE {
  ACCESS_TOKEN = "access_token",
}

export enum SEARCH_OPTIONS {
  NOTIFICATION = "notification",
  HOME = "home",
  FRIENDS_REQUESTS = "friendsRequest",
  PROFILE_PAGE = "profilePage",
  FRIENDS_SUGGESTIONS = "friendsSuggestion",
  YOUR_FRIENDS = "yourfriends",
}
