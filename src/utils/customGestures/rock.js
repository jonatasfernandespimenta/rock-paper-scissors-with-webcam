import * as fp from 'fingerpose'

const rockGestureDescription = new fp.GestureDescription('rock');

for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  rockGestureDescription.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

export default rockGestureDescription;
