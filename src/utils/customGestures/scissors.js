import * as fp from 'fingerpose'


const scissorsDescription = new fp.GestureDescription('scissors');


// thumb:
scissorsDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
scissorsDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
scissorsDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

// index:
scissorsDescription.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
scissorsDescription.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
scissorsDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
scissorsDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);
scissorsDescription.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
scissorsDescription.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);

// middle:
scissorsDescription.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
scissorsDescription.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
scissorsDescription.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpLeft, 1.0);
scissorsDescription.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 1.0);
scissorsDescription.addDirection(fp.Finger.Middle, fp.FingerDirection.HorizontalLeft, 1.0);
scissorsDescription.addDirection(fp.Finger.Middle, fp.FingerDirection.HorizontalRight, 1.0);

// ring:
scissorsDescription.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
scissorsDescription.addCurl(fp.Finger.Ring, fp.FingerCurl.HalfCurl, 0.9);

// pinky:
scissorsDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
scissorsDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.HalfCurl, 0.9);

export default scissorsDescription;