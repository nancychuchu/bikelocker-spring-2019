# BikeLocker

## Project Description

BikeLocker is an iOS app created for the modern city biker. It will help you find and share information about bike parking around town. The information provided is from the Police Department of Vancouver as well as from the biking community itself. As a user, you can check where there are lockers available, whether they have been reviewed by other users and how safe it is to leave a bike there. You can also add new bike parking spots or add your review to existing ones.

## App Demo

![BikeLocker Demo](demoGif/bikelocker_demo.gif)

## About the Authors

[Nancy Chu](https://www.linkedin.com/in/chunancy/) holds a BS in Mechanical Engineering from UBC and is experienced in the robotics industry. She was the project manager in this project, responsible for the roadmap, backlog and sprints planning on ZenHub, plus a great portion of the code, especially the GraphQL backend on GraphCool.

[Gavin Jin](https://www.linkedin.com/in/gavin-jin-288160178/) is a talented developer, constantly seeking new technologies to learn. More recently, he is diving into blockchain technologies. He loves using Javascript, React, React Native and CSS. In this project, he mainly contributed to the backend in GraphQL and the CRUD for the bike lockers.

[Jeremiah Aguirre](https://www.linkedin.com/in/jeremiah-aguirre-606708181/) is a skilled developer and web technologies Teaching Assistant. He enjoys working in a team and always likes to learn new things. Some of his favourite languages are React, React Native, Javascript and PHP. For this project he mostly worked on integrating Google Maps with customized app pins and the user on-boarding screens, having contributed to the other parts as well.

[Andre Moura](https://www.linkedin.com/in/andre-marques-moura/) an experienced Product Manager working in the Tech Industry. He was responsible for the app structure and navigation, as well as the CRUD for the user profile information.

## Technologies Used

- React Native
- Apollo
- GraphQL
- AsyncStorage
- XCode
- Google Maps API

## Instructions for Running

### Installation

Install dependencies:

```bash
cd server
yarn
```

```bash
cd client
yarn
```

You will also need to install Podfiles for Google MapView

---

- Navigate to:

```bash
client/ios
```

- And run:

```bash
 pod install
```

---

### Run iOS simulator

```bash
cd client
react-native run-ios
```
