const Animation = {
  galadriel: {
    idle: "galadriel-idle",
    attack: "galadriel-casts-spell",
    hurt: "galadriel-hurt",
    win: "galadriel-win",
    spin: "galadriel-spin",
    die: "galadriel-die"
  },
  elrond: {
    idle: "elrond-idle",
    attack: "elrond-casts-spell",
    hurt: "elrond-hurt",
    win: "elrond-win",
    spin: "elrond-spin",
    die: "elrond-die"
  },
  arwen: {
    idle: "arwen-idle",
    attack: "arwen-casts-spell",
    hurt: "arwen-hurt",
    win: "arwen-win",
    spin: "arwen-spin",
    die: "arwen-die"
  },
  figwit: {
    idle: "figwit-idle",
    attack: "figwit-casts-spell",
    hurt: "figwit-hurt",
    win: "figwit-win",
    spin: "figwit-spin",
    die: "figwit-die"
  },
  spell: {
    player1: {
      fireball: "fireball-right",
      thunder: "thunder-right",
      purpleExplosion: "purple-explosion-right"
    },
    player2: {
      fireball: "fireball-left",
      thunder: "thunder-left",
      purpleExplosion: "purple-explosion-left"
    }
  },
  leaves: {
    idle: "leaves"
  }
};

export const Character = imgUrl => {
  if (
    imgUrl ===
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/5_animation_attack_000.png?alt=media&token=aa3739c6-9e8e-47c6-9a1b-b97187c971d3"
  ) {
    return "galadriel";
  } else if (
    imgUrl ===
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/Figwit.png?alt=media&token=eaf3e0df-5fd4-4293-aaeb-e066b1fe7d3e"
  ) {
    return "figwit";
  } else if (
    imgUrl ===
    "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/2_animation_idle_002.png?alt=media&token=d52ef37c-11c6-4ec2-9c52-242804ba3e34"
  ) {
    return "arwen";
  } else {
    return "elrond";
  }
};

export default Animation;
