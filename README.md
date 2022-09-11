author@Ze Liu

# TravelPlace
A full-stack project have place to travel. Allow sign up &amp; in users to CRUD own posts and reviews.. The front-end use Bootstrap including CSS to organize.
## Homepage
![image](https://user-images.githubusercontent.com/32544961/123673947-a0e4d500-d81b-11eb-8076-f748182eadc7.png)

**Front-end:** Bootstrap <br>
**Back-end:** Node.js  <br>
**Database:** MongoDB <br>



# CRUD Functionalities (with information shows up)
## Make a new post
Users can send a new post and also upload images.

![image](https://user-images.githubusercontent.com/90260431/189530121-08084826-64e1-47a4-9ef9-c73f22f739eb.png)


## Update Post
Including delete images.

![image](https://user-images.githubusercontent.com/90260431/189530137-897297df-5514-4532-8c5e-0a490c8a59bf.png)

## Delete Post & Add/Delete/Update Reviews

![image](https://user-images.githubusercontent.com/90260431/189530145-423be91f-3a3b-4ccc-8144-4f27f0962670.png)


# Other Functionalities:
## Maps
Maps showed the location of the travel spot. How many are clustered on the map. Users are available to click the spot to view the pop-up information, then click the link to the post. One at the homepage for the overview spots, and one in the post for the specific location.

<img width="205" alt="image" src="https://user-images.githubusercontent.com/90260431/189530167-2b3c98ed-1960-42f1-9a63-75b2c92e4ed0.png">

![image](https://user-images.githubusercontent.com/90260431/189530169-b08c5f19-3eda-4024-a102-def97c0f95d0.png)


## Login & Register
Users have to register and login to make new posts.

![image](https://user-images.githubusercontent.com/90260431/189530185-2259ed36-ce34-4ca3-b2b5-85700f33481e.png)

![image](https://user-images.githubusercontent.com/90260431/189530191-00cd59ba-52a5-4a3c-a6c1-fc78098a240e.png)


## Review with stars
User can write a review with star evaluation
![image](https://user-images.githubusercontent.com/90260431/189530213-3161b17a-1786-45f2-9a9a-72e8992ef3d1.png)
![image](https://user-images.githubusercontent.com/90260431/189530218-eb37c83f-2061-4f43-924e-3b03f6401781.png)

## Validation & Error displays
If the text field is empty, the user cannot send a post, register or login.

![image](https://user-images.githubusercontent.com/90260431/189530228-141a6b89-cae3-45fb-ba50-80c45c47bde7.png)
![image](https://user-images.githubusercontent.com/90260431/189530233-f9a5512e-19ec-4d62-aa90-0dbf30bcce65.png)

## Authentication/Permission
Users can only have the permission to CRUD his own posts.

## Images move animation
User can scoll left or right to view pictures on posts.

<img width="1036" alt="image" src="https://user-images.githubusercontent.com/90260431/189530349-b9c48b27-f48f-44b3-9de3-948595c420fd.png">


# Used Open APIs
mapbox
https://docs.mapbox.com/api/overview/

cloudinary

https://cloudinary.com/documentation/image_upload_api_reference

Cloudinary api get the images to the cloud database, so our database would still clean and not crushed.


Mongodb record:
![image](https://user-images.githubusercontent.com/32544961/123674603-5fa0f500-d81c-11eb-982b-90e2328644ad.png)


