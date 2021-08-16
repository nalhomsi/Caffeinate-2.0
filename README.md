# Caffeinate-2.0

Tired of Starbucks? Want to explore the culture of your city? Caffeinate the City lists the location and reviews of the local coffee shops in Austin so that you can expand your coffee horizons. By clicking on an icon near your neighborhood, Caffeinate will list shops in your area so that you can find your new favorite spot! Users can log in and rate their coffee shops, as well as leave feedback and reviews. 

The motivation of this project is to push local businesses, especially in the time of covid when local businesses are struggling. They may not have the revenue for advertisement the way a corporate coffee chain would so our app draws attention to them.

![caffeinated](https://user-images.githubusercontent.com/80538653/129639178-1cdd3638-1fb3-4bbc-8ce3-7e457e1711e6.jpg)


# Caffeinate-2.0 API Calls

## Get Statements

    GET /api/v1/reviews/
    GET /api/v1/reviews/{username}
    GET /api/v1/shops/
    GET /api/v1/shops/{name}

## POST Statements

**REGISTER API**

Description: POST API used to register new users into the database

    if successful {

        POST /api/v1/register
        application/json
        {
    	    "username": {username},    - REQUIRED
    	    "email": {email},          - REQUIRED
    	    "password": {password}     - REQUIRED
    	}

    	Response:
    	application/json
    	{
    		"message": "Thanks for registering!"
    	}
    }

    Possible Errors:
    (400) - Malformed request body;
    (409) - User with email or username already exists;

**LOGIN API**

Description: POST API used to validate the user and provide a signed accessToken and refreshToken

    if successful {

        POST /api/v1/login
        application/json
        {
    	    "email": "user@email.com", - REQUIRED
    	    "password": "password",    - REQUIRED
    	}

    	Response:
    	Sends a cookie called "caffRefreshToken" with an expiry time of 8 hours
    	application/json
    	{
    		"message": "Successfully signed in",
    		"userId": {num},
    		"accessToken": "signedAccessToken",
    	}

    }
    Recommendations:
    Store accessToken in localStorage
    Store refreshToken in cookies

    Possible Errors:
    (400) - Malformed request body;
    (401) - Incorrect email/password;

**SUBMIT REVIEW API**

Description: POST API that is used to submit a JSON body containing a rating, optional body and the corresponding shop's id

    if successful {

    	POST /api/v1/reviews/post
    	application/json
    	headers: {
    		Authorization: "Bearer " + accessToken;   - REQUIRED
    	}
    	{
    		"rating": {num},          - REQUIRED
    		"body": {body_of_post},   - OPTIONAL
    		"shopId": {shopId}        - REQUIRED
    	}

    	Response:
    	application/json
    	{
    		"message": "Successfully posted review"
    	}
    }
    Recommendations:
    Ensure that the authorization headers are present and there is a space between Bearer and the token

    Possible Errors:
    (400) - Malformed request body;
    (401) - Unauthorized, Token is not valid
    (403) - User has already submitted a review for that particular shop

**GENERATE NEW ACCESS TOKEN**

Description: POST API that is used on requests that require authentication if a previous call was rejected due to not being authorized. The user will either be issued a new token based off of a valid refresh token that they currently have or will be prompted to login based off of the response.

    if successful {

    	POST /api/v1/token
    	Cookie:
    	{
    		"caffRefreshToken": signedRefreshToken,  - REQUIRED
    	}

    	Response:
    	application/json
    	{
    		"accessToken": signedAccessToken
    	}
    }
    Recommendations:
    Save the new accessToken in localStorage

    Possible Errors:
    (400) - Malformed request body;
    (401) - Unauthorized, Token is missing (User has to log in again, send them the login API)
    (403) - Token is invalid (User has to log in again, send them the login API)

## DELETE Statements

**LOGOUT API**

Description: DELETE API that is used to invalidate the user's refresh token in the database by removing the entry from the table meaning that access tokens can no longer be renewed with the Token API.

    if successful {

    	DELETE /api/v1/logout
    	Cookie:
    	{
    		"caffRefreshToken": signedRefreshToken,  - REQUIRED
    	}

    	Response:
    	application/json
    	{
    		"message": "Successfully logged out"
    	}
    }
    Recommendations:
    Delete the user's accessToken from their localStorage

    Possible Errors:
    (400) - Token is not in the request body;
    (401) - Unauthorized, Token does not exist in the DB (User has to log in again, send them the login API)

API Written by: Geoffrey Wein
