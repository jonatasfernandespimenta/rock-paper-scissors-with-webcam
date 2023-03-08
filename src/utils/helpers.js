const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};


export const drawHand = (predictions, ctx) => {
  if(predictions.length > 0) {
    predictions.forEach((prediction) => {
      const landMarks = prediction.landmarks;

      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];

        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          ctx.beginPath();
          ctx.moveTo(
            landMarks[firstJointIndex][0],
            landMarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landMarks[secondJointIndex][0],
            landMarks[secondJointIndex][1]
          );
          ctx.strokeStyle = "white";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      landMarks.forEach(landMark => {
        const x = landMark[0];
        const y = landMark[1];
  
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI);
        
        ctx.fillStyle = "indigo";
        ctx.fill()
      })
    })

  }
}

export const play_options = ['rock', 'paper', 'scissors']

export const gameResult = (cpInput, playerInput) => {
  if(cpInput === playerInput) {
    return 'tie'
  }
  
  if(cpInput === 'rock') {
    if(playerInput === 'paper') {
      return 'won'
    }

    if(playerInput === 'scissors') {
      return 'lose'
    }
  }

  if(cpInput === 'paper') {
    if(playerInput === 'scissors') {
      return 'won'
    }

    if(playerInput === 'rock') {
      return 'lose'
    }
  }

  if(cpInput === 'scissors') {
    if(playerInput === 'rock') {
      return 'won'
    }

    if(playerInput === 'paper') {
      return 'lose'
    }
  }
}
