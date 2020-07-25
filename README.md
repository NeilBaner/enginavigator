# enginavigator
 
 ## Team Members

 [@neilbaner](https://github.com/neilbaner) : Neil Banerjee

 [@yAOwzers](https://github.com/yAOwzers) : Neo Yao Jie, Joel

 ## Proposed Level of Acheivement 

 Gemini

 ## The Problem

 ### What?

 #### What is the exact nature of the problem? (Problem Specification)

NUS Engineering is a labyrinth to navigate. Ever tried finding LT1? I have. It took me and a friend half an hour of walking (running), including under the hot August afternoon sun, only to still be 10 minutes late. The signs don't help matters; try following the signs from, say, E4 to EA. Even after a year of studying there, I still get lost at NUS FoE. It's a massive faculty spread over so many different buildings that it's inevitably really hard to navigate. Plus, whenever I ask the class Whatsapp group how to get somewhere, the answer is "just use google maps lol" which is not very helpful because Google Maps can't exactly take me from E3-06-05 to EA-06-23 or something. - Neil

 ### Who?

 #### Who is facing the problem? Who will benefit from the final product? (Target Audience) 

* NUS Engineering students like ourselves who constantly get lost in the labyrinth that is the Faculty of Engineering

* Visitors to NUS Engineering, such as prospective students during open days/information sessions, guest speakers etc.

* Staff, professors, lecturers, and other faculty members who may also get lost at times. 

 ### Why?

 #### What benefits will the product bring to the user? Why would they want to use this product? (Justification)

No one likes being late to class, whether as a student or a teacher. Sometimes, you just get lost and waste time just wandering around in the completely wrong place. Other times, you underestimate just how long the walk to LT7 is from E5, and leave for a 17:00 lecture at 16:55. If you have an exam or test you cannot be late for, being able to find the classroom/location on time becomes even more important. 


 ## Our Solution

 ### What?

 #### What kind of product will we produce? What features will it have? (Important Features)

* Web app similar to Google Maps, but specifically for the NUS Faculty of Engineering. 

* Enter a start and end point and get turn-by-turn directions to where you want to go, with the shortest route.

* Find wheelchair-friendly routes if you can't, or don't want to, use the stairs for whatever reason. 

* **Possible extension**: Find nearby toilets/food outlets/staircases/other facilities

* **Possible extension**: Progresssive Web App which can be installed on any device with a supported web browser. No proprietary app stores needed! (plus we save on the developer account fees)

 ### How?

 #### What technologies, programming languages and tools will we use to produce the final product? How will it work? (Implementation details) 

* Front-end client made with node (server-side), Express (in-between), React (client-side) **tentatively: hosted on AWS EC2**

* API for getting location and direction information with AWS Lambda and AWS API gateway

* MySQL database on AWS RDS for data storage

 ### When?

 #### A rough timeline of when our final product will be completed

 // timeline (rough)

## UPDATE: Milestone 2

1. We changed plans a bit, and instead of building a full MERN-stack style application, which would be a monolithic application, we decided to adopt a more microservice-style approach. Now, we have an API that we can access that will allow us to search for locations on the map, as well as return a route given a start and end point. This will work alongside the web application, which will still be coded with node, express and react. It is considered good software engineering practice to break up the application into microservices in this fashion. The advantage of this approach is that it's much more scaleable and easy to maintain. For example, if we decide to make an Android or iOS application, we can simply use the API to generate routes and get map data, instead of rewriting the mapping code over and over. We could also potentially open up the API for other developers to use if they want to try and make a better version of our product. Additionally, it makes the application easier to debug, since we can easily isolate errors, and easier to maintain, since there is more defined separation and we can have different people in charge of different parts who can work independently without affecting the others' code. 

![meme-software-engineer](https://github.com/NeilBaner/enginavigator/blob/master/meme-2.jpg)

2. We now have a (somewhat) functional back end. We have an API, accessible at [this link](https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/) which allows us to search for locations and then get a route from one location to another. Instructions for how to use this API are available [here](https://github.com/neilbaner/enginavigator/blob/master/api_instructions.md), feel free to test it out!

Here is the sample map we're using for the prototype:

![sample-map](https://github.com/NeilBaner/enginavigator/blob/master/prototype_one_map.jpg)
