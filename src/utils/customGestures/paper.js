import * as fp from 'fingerpose'

const paperGestureDescription = new fp.GestureDescription('paper');

for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  paperGestureDescription.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
}

export default paperGestureDescription;
