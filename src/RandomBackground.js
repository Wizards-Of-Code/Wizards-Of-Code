const randomizeUrls = () => {
  let urls = [
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/greenForest2.png?alt=media&token=5cd23aab-3e43-41b9-a0d1-f9fb5ed327b9",
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/greenForest3.png?alt=media&token=749ffe75-27c9-4636-9cbc-adb47f427060",
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/purpleTrees.png?alt=media&token=67853061-c046-40f5-8a99-79acb61da328",
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/redForest.png?alt=media&token=48cfd0a8-2e65-4a72-80a4-cc9dcf681057",
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/shroomForest.jpg?alt=media&token=7952270f-afc7-4438-ae2b-79a459f80497",
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/shroomForest2.png?alt=media&token=7cd90fe6-033a-4f80-ac2f-81b2e146dbdc",
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/waterfall.png?alt=media&token=52f21e74-2bd6-4822-9bd8-899b2e1562c6",
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/wave.png?alt=media&token=784fe750-1bf2-4565-b4ee-89ebe22c4d3a"
  ];

  return urls[Math.floor(Math.random() * urls.length)];
};

export default randomizeUrls;
